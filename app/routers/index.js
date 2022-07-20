const express = require("express");

const apiRouter = require("./api");

const router = express.Router();

// On préfixe les routers
router.use("/api", apiRouter);


module.exports = router;