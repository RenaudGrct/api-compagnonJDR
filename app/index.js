const express = require("express");
const path = require("path");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { accessControl } = require("./middleware/accessControl");

const router = require("./routers");

//~~ Protection de notre API
app.use(helmet());


//~~ Dossier static
app.use(express.static(path.join(__dirname, "public")));

//~~ ENCODAGE
// JSON payload parser
app.use(express.json());
// URLENCODED payload parser
app.use(express.urlencoded({ extended: false }));
// COOKIE parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//~~ Middleware des CORS options
app.use(accessControl);

//~~ ROUTER
app.use(router);

module.exports = app;