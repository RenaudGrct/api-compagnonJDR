require("dotenv").config();
const allowedOrigins = require("../config/allowedOrigins");
const ApiError = require("../errors/apiError");

module.exports = {
  accessControl (req, res, next){
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
      res.header("Access-Control-Allow-Credentials", true);
    } else {
      throw ApiError(`Aucune origin autorisées : ${origin}`, {statusCode: 400});
    }
    // response to preflight request
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  }
};