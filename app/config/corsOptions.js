const ApiError = require("../errors/apiError");
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: "http://localhost:8080",
  preflightContinue: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200
};

module.exports = corsOptions;