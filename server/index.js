const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
  });
});
