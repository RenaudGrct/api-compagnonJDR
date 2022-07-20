const express = require("express");

const router = express.Router();
const { apiController } = require("../../controllers");

// Route par défaut de l'API
router.all("/", apiController.home);


// Toutes les routes de notre API


module.exports = router;