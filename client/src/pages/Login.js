import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        var session = {
          username: response.data.username,
          id: response.data.id,
          status: true,
        };
        localStorage.setItem("user", JSON.stringify(session));
        window.location.reload(true);
      }
    });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>Usuário:</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Senha:</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </form>
    </div>
  );
}

export default Login;
