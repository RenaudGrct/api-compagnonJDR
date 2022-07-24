require("dotenv").config();
const ApiError = require("../../errors/apiError");

const jwt = require("jsonwebtoken");

module.exports = {
  async authentificateToken (req, _, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      throw new ApiError(" Accès non autorisé !", { statusCode : 401 });
    }

    if (!token) {
      throw new ApiError(" Accès non autorisé !", { statusCode : 403 });
    }

    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) =>{
      if (err) {
        throw new ApiError(" Accès non autorisé !", { statusCode : 403 });
      }
      req.user = user;
      next(user);
    });
  }
};