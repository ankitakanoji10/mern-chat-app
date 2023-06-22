const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "ankita", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;