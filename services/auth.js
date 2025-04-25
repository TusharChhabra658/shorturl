const jwt = require("jsonwebtoken");
const jwtsecret = "1h23j@#@yg2c3werjwoiejrco3";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    jwtsecret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, jwtsecret);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
