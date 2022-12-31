const express = require("express");
const User = require("../modal/user");
const auth = require("../middleware/auth");
const route = new express.Router();

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredential(email, password);
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(400).json(error);
  }
});

route.delete("/me", auth, async (req, res) => {
  const { _id } = req.user;
  const deletedUser = await User.deleteOne({ _id });
  if (!deletedUser) return res.status(404).json({ error: "unable to delete" });
  res.json(deletedUser);
});

route.post("/", async (req, res) => {
  const acceptedField = ["name", "email", "age", "password"];
  const isMatched = Object.keys(req.body).every((field) =>
    acceptedField.includes(field)
  );
  if (!isMatched) return res.status(400).json({ error: "invalid field" });
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).send(error);
  }
});

route.get("/me", auth, async (req, res) => {
  const user = req.user;
  await user.populate("post");
  console.log(user);
  res.send(req.user);
});

route.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(500).json(error);
  }
});

route.post("/all-logout", auth, (req, res) => {
  try {
    req.user.tokens = [];
    req.user.save();
    res.json({ message: "completely logged out" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = route;
