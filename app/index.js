const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("./services/swaggerDocs")(app);
const { credentials } = require("./middleware/credentials");

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

//~~ Middleware CORS
app.use(credentials);


// ROUTER
app.use(router);

module.exports = app;