const express = require("express");

// Importation du controller et le handler
const { raceController : race } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

//~~~~~~~~~~~~~~
//~~ SELECT RACE
//~~~~~~~~~~~~~~
router.route("/:index")
  .get(controllerHandler(race.getRaceSelected));

module.exports = router;