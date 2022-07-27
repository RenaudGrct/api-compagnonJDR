const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("./services/swaggerDocs")(app);
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const router = require("./routers");

//~~ Protection de notre API
app.use(helmet());


//~~~~~~~~~~~~
//~~ ENCODAGE~
//~~~~~~~~~~~~
// JSON payload parser
app.use(express.json());
// URLENCODED payload parser
app.use(express.urlencoded({ extended: false }));
// COOKIE parser
app.use(cookieParser());


//~~ CORS config
if (process.env.NODE_ENV === "prod"){
  corsOptions.origin = process.env.FRONTEND_LOCAL_URL;
}
app.use(cors(corsOptions));

// ROUTER
app.use(router);

module.exports = app;