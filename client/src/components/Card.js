import React from "react";

function Card(props) {
  return (
    <div class="card mt-5 mx-auto" style={{ maxWidth: "50rem" }}>
      <div class="card-header">{props.titulo}</div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{props.texto}</p>
          <footer class="blockquote-footer">
            <cite title="Source Title">{props.usuario}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

export default Card;
