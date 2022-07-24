require("dotenv").config();
const ApiError = require("../../errors/apiError");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./generateToken");

module.exports = {
  async refreshToken (req, res){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(" Accès non autorisé !", { statusCode : 401 });
    }

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) =>{
      if (err) {
        throw new ApiError(" Accès non autorisé !", { statusCode : 401 });
      }
      // TODO : check BDD user toujours existant
      delete user.iat;
      delete user.exp;
      const refreshedToken = generateAccessToken(user);
      return res.status(200).json(refreshedToken);
    });
  }
};