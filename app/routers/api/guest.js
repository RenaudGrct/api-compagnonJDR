const express = require("express");

// importation de Joi
const validate = require("../../services/validation/validator");
const createSchema = require("../../services/validation/schemas/userCreateSchema");

// Importation du controller et le handler
const { guestController: guest } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

//~~~~~~~~~~~
//~~ PROFILE
//~~~~~~~~~~~
router.route("/:id(\\d+)")
  .get(controllerHandler(guest.getProfile));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~ CREATE USER ACCOUNT FROM GUEST
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
router.route("/:guestId(\\d+)/confirm-register")
  .post(validate("body", createSchema), controllerHandler(guest.transformAccount));

module.exports = router;