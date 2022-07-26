const debug = require("debug")("token:auth");
require("dotenv").config();
const ApiError = require("../../errors/apiError");

const jwt = require("jsonwebtoken");

module.exports = {
  async authentificateToken (req, _, next){
    const authHeader = req.headers["authorization"];
    debug("authHeader :", authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    debug("token :", token);
    if (token == null) {
      throw new ApiError(" Accès non autorisé !", { statusCode : 401 });
    }

    if (!token) {
      throw new ApiError(" Accès non autorisé !", { statusCode : 403 });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
      if (err) {
        throw new ApiError(" Accès non autorisé !", { statusCode : 403 });
      }
      req.user = user;
      debug(req.user);
      next();
    });
  }
};