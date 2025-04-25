const user = require("../models/user");
const { setUser } = require("../services/auth");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const User = await user.findOne({ email, password });
  if (!User) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const token= setUser(User);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
