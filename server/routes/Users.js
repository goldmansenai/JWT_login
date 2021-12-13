const express = require("express");
const router = express.Router();
const db = require("../models");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userObject = await db.sequelize.models.Users.findOne({
    where: { username },
  });

  if (userObject?.dataValues.username === req.body.username) {
    res.send("Usuário já existe");
  } else if (username === "" || password === "") {
    res.send("Usuário ou senha não podem estar em branco!");
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      db.sequelize.models.Users.create({
        username: username,
        password: hash,
      });
    });
    res.json("Usuário criado com sucesso!");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db.sequelize.models.Users.findOne({
    where: { username: username },
  });

  if (!user) {
    res.json({ message: "Usuário não existe!" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({ message: "Usuário ou senha errados!" });
      return;
    } else {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "mySecret"
      );
      res.json({ token: accessToken, username: username, id: user.id });
    }
  });
});

module.exports = router;
