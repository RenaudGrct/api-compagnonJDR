const express = require("express");

// Importation du service de validation Joi et ses schema.
const validate = require("../../services/validation/validator");
const updateSchema = require("../../services/validation/schemas/userUpdateSchema");

// Importation du controller et le handler
const {
  userController: user,
  guestController: guest
} = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

// Importation des middleware
// const <middleware> = require(<"../..">);

const router = express.Router();

//~~~~~~~~~~~
//~~ PROFILE
//~~~~~~~~~~~
router.route("/:id(\\d+)")
  .get(controllerHandler(user.getProfile))
  .patch(validate("body", updateSchema), controllerHandler(user.updateProfile))
  .delete(controllerHandler(user.deleteProfile));

module.exports = router;