const express = require("express");


// Importation du controller et le handler
const { characterController: character } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

router.route("/:userId")
  .get(controllerHandler(character.getAllCharacter));

module.exports = router;