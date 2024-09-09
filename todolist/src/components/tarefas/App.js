import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebaseConnection";
import { collection, setDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConnection";
import "../tarefas/TaskList.css";

function TaskList() {
  const tasksRef = collection(db, "tasks");
  const [tasks] = useCollectionData(tasksRef, { idField: "id" });
  const [newTaskName, setNewTaskName] = useState("");
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [user] = useAuthState(auth);

  const addTask = async (task) => {
    const newTaskRef = doc(tasksRef);
    await setDoc(newTaskRef, { ...task, id: newTaskRef.id });
  };

  const editTask = async (id, updatedTask) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, updatedTask);
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const handleAddTask = () => {
    if (newTaskName.trim() !== "") {
      addTask({ name: newTaskName });
      setNewTaskName("");
    }
  };

  const handleEditTask = () => {
    if (editTaskName.trim() !== "" && editTaskId) {
      editTask(editTaskId, { name: editTaskName });
      setEditTaskName("");
      setEditTaskId(null);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <ul>
            {tasks && tasks.map(task => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => {
                  setEditTaskId(task.id);
                  setEditTaskName(task.name);
                }}>Editar</button>
                <button onClick={() => deleteTask(task.id)}>Excluir</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Nova Tarefa"
          />
          <button onClick={handleAddTask}>Adicionar Tarefa</button>
          {editTaskId && (
            <div>
              <input
                type="text"
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
                placeholder="Edite o nome da tarefa"
              />
              <button onClick={handleEditTask}>Atualizar Tarefa</button>
            </div>
          )}
        </>
      ) : (
        <p>Por favor, faça login para ver as tarefas.</p>
      )}
    </div>
  );
}

export default TaskList;
