import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConnection";
import "../login/Auth.css";

function Auth() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    let message = "Ocorreu um erro. Por favor, tente novamente.";
    switch (error.code) {
      case "auth/invalid-email":
        message = "O email fornecido é inválido.";
        break;
      case "auth/user-not-found":
        message = "Nenhuma conta encontrada com esse email.";
        break;
      case "auth/wrong-password":
        message = "Senha incorreta.";
        break;
      case "auth/email-already-in-use":
        message = "Esse email já está em uso.";
        break;
      default:
        message = "Ocorreu um erro desconhecido.";
        break;
    }
    alert(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      register();
    } else {
      signIn();
    }
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Bem-vindo, {user.email}</p>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            <button type="submit">{isRegistering ? "Registrar" : "Login"}</button>
          </form>
          <p>
            {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Login" : "Registrar"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Auth;
