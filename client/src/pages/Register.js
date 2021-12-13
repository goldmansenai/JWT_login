import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registrar = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/register", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert(response.data);
      }
    });
  };
  return (
    <div>
      <h1>Register Page</h1>
      {/* <form>
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
        <button onClick={registrar}>Cadastrar</button>
      </form> */}
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
