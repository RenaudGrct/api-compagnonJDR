const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)){
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Acces-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;