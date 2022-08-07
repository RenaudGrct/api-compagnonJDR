const express = require("express");

// Importation du controller et le handler
const { backgroundController : backgrounds } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

//~~~~~~~~~~~~~~~~~~~~
//~~ SELECT BACKGROUND
//~~~~~~~~~~~~~~~~~~~~
router.route("/")
  .get(controllerHandler(backgrounds.getAllBackgrounds));

module.exports = router;