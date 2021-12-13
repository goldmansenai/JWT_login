import axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const obj = JSON.parse(localStorage.getItem("user"));
  const [titulo, setTitulo] = useState("");
  const [post, setPost] = useState("");
  const [listPosts, setListsPosts] = useState([]);

  const criar = () => {
    const data = { title: titulo, postText: post, username: obj?.username };
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Post Criado");
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsPosts(response.data);
    });
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <h2>Seja bem-vindo! {obj?.username}</h2>
      </div>
      {!obj?.username && <h2>Você não esta logado</h2>}
      {obj?.username && (
        <div>
          <h2>Crie um post</h2>
          <div>
            <form>
              <label>Título</label>
              <input
                onChange={(e) => {
                  setTitulo(e.target.value);
                }}
              />
              <label>Post</label>
              <input
                onChange={(e) => {
                  setPost(e.target.value);
                }}
              />
              <button onClick={criar}>Criar</button>
            </form>
          </div>
          <div>
            {listPosts.map((value, key) => {
              return (
                <div key={value.id}>
                  <div>{value.title}</div>
                  <div>{value.postText}</div>
                  <div>{value.username}</div>
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
