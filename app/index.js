const express = require("express");
const cors = require("cors");

const router = require("./app/routers");

const app = express();
require("./app/service/swaggerDocs")(app);


// ENCODAGE
// JSON payload parser
app.use(express.json());
// URLENCODED payload parser
app.use(express.urlencoded({ extended: false }));

// all CORS restrictions disabled
app.use(cors());

// ROUTER
app.use(router);

module.exports = app;