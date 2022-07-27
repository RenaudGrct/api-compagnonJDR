const ApiError = require("../errors/apiError");
const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin) =>{
    if(!allowedOrigins.includes(origin)){
      throw new ApiError("Origin not allowed by CORS", { statusCode: 503 });
    }
    return true;
  },
  preflightContinue: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200
};

module.exports = corsOptions;