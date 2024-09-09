import React from "react";
import Auth from "./components/login/App";
import TaskList from "./components/tarefas/App";
import "./App.css"; // Importe o arquivo CSS

function App() {
  return (
    <div className="app-container">
      <div className="component-spacing">
        <Auth />
      </div>
      <div className="component-spacing">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
