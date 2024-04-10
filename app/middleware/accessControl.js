require("dotenv").config();
const allowedOrigins = require("../config/allowedOrigins");

module.exports = {
  accessControl (req, res, next){
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
      res.setHeader("Access-Control-Allow-Private-Network", true);
      res.setHeader("Access-Control-Allow-Credentials", true);
    }
    // response to preflight request
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  }
};