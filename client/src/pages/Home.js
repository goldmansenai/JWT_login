import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import Card from "../components/Card";

function Home() {
  const obj = JSON.parse(localStorage.getItem("user"));
  const [titulo, setTitulo] = useState("");
  const [post, setPost] = useState("");
  const [listPosts, setListsPosts] = useState([]);

  const criar = () => {
    const data = { title: titulo, postText: post, username: obj?.username };
    if (titulo === "" || post === "") {
      alert("O post não pode ter campos em branco!");
    } else {
      axios
        .post("http://localhost:3001/posts", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            window.location.reload(true);
          }
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsPosts(response.data);
    });
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-center align-items-baseline">
        <h2>Seja bem-vindo! </h2>
        <h1 className="px-2">
          <b>{obj?.username}</b>
        </h1>
      </div>
      {!obj?.username && <h2>Você não está logado</h2>}
      {obj?.username && (
        <div>
          <h2>Crie um post</h2>
          <div>
            <Form inline>
              <FormGroup floating>
                <Input
                  placeholder="Titulo"
                  type="text"
                  onChange={(e) => {
                    setTitulo(e.target.value);
                  }}
                />
                <Label>Título</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  placeholder="Conteudo"
                  type="text"
                  onChange={(e) => {
                    setPost(e.target.value);
                  }}
                />
                <Label>Conteúdo</Label>
              </FormGroup>
              <Button onClick={criar}>Criar</Button>
            </Form>
          </div>
          <div>
            {listPosts.map((value) => {
              return (
                <div key={value.id}>
                  <Card
                    titulo={value.title}
                    texto={value.postText}
                    usuario={value.username}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
