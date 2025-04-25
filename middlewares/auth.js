const { getUser } = require("../services/auth");

async function restrictUserToLogin(req, res, next) {
  const userId = req.cookies?.uid;
  if (!userId) {
    return res.redirect("/login");
  }
  const User = getUser(userId);
  if (!User) {
    return res.redirect("/login");
  }
  req.user = User;
  next();
}

async function checkAuth(req, res, next) {
  const userId = req.cookies?.uid;
  const User = getUser(userId);
  req.user = User;
  next();
}

module.exports = { restrictUserToLogin, checkAuth };
