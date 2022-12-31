const express = require("express");
const Post = require("../modal/post");
const auth = require("../middleware/auth");

const route = express.Router();

route.get("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const post = await Post.findOne({ _id, owner: req.user._id });
  if (!post) return res.status(404).json({ error: "unable to find" });
  res.json({ post });
});

route.get("/", auth, async (req, res) => {
  const posts = await Post.find({ owner: req.user._id });
  if (!posts) return res.status(404).json({ error: "unable to find" });
  res.json(posts);
});

route.delete("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const deletedPost = await Post.deleteOne({ _id, owner: req.user._id });
  if (!deletedPost) return res.status(400).json({ error: "unable to delete" });
  res.json(deletedPost);
});

route.patch("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updatedPost = await Post.findOneAndUpdate({ _id, owner: req.user._id });
  if (!updatedPost) return res.status(404).json({ error: "unable to update" });
  res.json(updatedPost);
});

route.post("/", auth, async (req, res) => {
  try {
    const post = await new Post({ ...req.body, owner: req.user._id });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = route;
