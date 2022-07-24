require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async generateAccessToken (user){
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, { expiresIn: "1800s"});
  },

  async generateRefreshToken (user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3M"});
  }
};