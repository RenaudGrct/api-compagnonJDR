const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const { apiController } = require("../../controllers");

// Route par défaut de l'API
router.all("/", apiController.home);


// Toutes les routes de notre API
router.use("/profile", userRouter);

module.exports = router;