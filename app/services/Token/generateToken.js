require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  async generateAccessToken (user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d"});
  },

  async generateRefreshToken (user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d"});
  }
};