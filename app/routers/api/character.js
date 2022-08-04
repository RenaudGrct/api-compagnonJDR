const express = require("express");


// Importation du controller et le handler
const { characterController: character } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

router.route("/user/:userId")
  .get(controllerHandler(character.getAllCharacters))
  .post(controllerHandler(character.createOneCharacter))

router.route("/:characterId/user/:userId")
  .get(controllerHandler(character.getOneCharacter))
  .delete(controllerHandler(character.destroyOneCharacter));

router.route("/guest/:guestId")
  .get(controllerHandler(character.getAllCharacters))
  .post(controllerHandler(character.createOneCharacter))

router.route("/:characterId/guest/:guestId")
  .get(controllerHandler(character.getOneCharacter))
  .delete(controllerHandler(character.destroyOneCharacter));

module.exports = router;