const express = require("express");
const router = express.Router();
const db = require("../models");
const { sign } = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const userObject = await db.sequelize.models.Users.findOne({
    where: { username },
  });

  if (userObject?.dataValues.username === req.body.username) {
    res.send("Usuário já existe");
  } else {
    const user = db.sequelize.models.Users.create({
      username: username,
      password: password,
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
    res.send("Usuário não existe!");
  }

  if (password !== user.password || username !== user.username) {
    res.send("Usuário ou senha errados!");
    return;
  }

  const accessToken = sign(
    { username: user.username, id: user.id },
    "mySecret"
  );
  res.json({ token: accessToken, username: username, id: user.id });
});

module.exports = router;
