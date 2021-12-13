const express = require("express");
const { tokenValidation } = require("../middlewares/Auth");
const router = express.Router();
const db = require("../models");

router.post("/", tokenValidation, async (req, res) => {
  const post = req.body;
  await db.sequelize.models.Posts.create(post);
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await db.sequelize.models.Posts.findAll();
  res.json(posts);
});

module.exports = router;
