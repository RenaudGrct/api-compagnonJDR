const debug = require("debug")("token:auth");
require("dotenv").config();
const ApiError = require("../errors/apiError");

const jwt = require("jsonwebtoken");

module.exports = {
  async verifyToken (req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError("Vous devez vous reconnecter pour accèder à cette page", { statusCode : 401 });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
      if (err) {
        throw new ApiError(" Token invalide !", { statusCode : 403 });
      }
      req.user = user;
      req.guest = user;
    });
    next();
  }
};