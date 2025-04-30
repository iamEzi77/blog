const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("posts/index", { posts });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("posts/new");
});

router.post("/", async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const newPost = new Post({ title, author, content });
    await newPost.save();
    res.redirect(`/posts/${newPost._id}`);
  } catch (err) {
    console.error(err);
    res.redirect("/posts/new");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("posts/show", { post });
  } catch (err) {
    console.error(err);
    res.redirect("/posts");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("posts/edit", { post });
  } catch (err) {
    console.error(err);
    res.redirect("/posts");
  }
});

module.exports = router;
