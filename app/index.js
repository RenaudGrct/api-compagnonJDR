const express = require("express");
const cors = require("cors");
const app = express();
require("./services/swaggerDocs")(app);

const router = require("./routers");

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