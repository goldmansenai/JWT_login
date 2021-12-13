import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registrar = () => {
    const data = { username: username, password: password };
    if (username.length < 3) {
      alert("Nome de usuário muito curto");
    } else if (username.length > 16) {
      alert("Nome de usuário muito longo");
    } else if (password.length < 8) {
      alert("Senha muito curta");
    } else if (password.length > 32) {
      alert("Senha muito longa");
    } else {
      axios
        .post("http://localhost:3001/auth/register", data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert("Usuário criado com sucesso!");
            navigate("/");
          }
        });
    }
  };
  return (
    <div>
      <h1>Register Page</h1>
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
        <Button onClick={registrar}>Cadastrar</Button>
      </Form>
    </div>
  );
}

export default Register;
