const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)){
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Acces-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.setHeader("Acces-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;