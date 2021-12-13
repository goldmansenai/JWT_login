import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    if (username === "" || password === "") {
      alert("Campos não podem estar em branco!");
    } else {
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          var session = {
            username: response.data.username,
            id: response.data.id,
            status: true,
          };
          localStorage.setItem("user", JSON.stringify(session));
          navigate("/");
          window.location.reload(true);
        }
      });
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <Form inline>
        <FormGroup floating>
          <Input
            placeholder="Username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Label for="exampleEmail">Usuário</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Label for="examplePassword">Senha</Label>
        </FormGroup>
        <Button onClick={login}>Login</Button>
      </Form>
    </div>
  );
}

export default Login;
