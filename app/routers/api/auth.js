const express = require("express");

// Importation du service de validation Joi et ses schema.
const validate = require("../../services/validation/validator");
const createSchema = require("../../services/validation/schemas/userCreateSchema");
const loginSchema = require("../../services/validation/schemas/loginSchema");

// Importation des controllers et le handler
const { userController : user } = require("../../controllers");
const { authController : auth } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

// Importation des middlewares
const { refreshToken } = require("../../services/Token/refreshToken");
const { createGuestProfile } = require ("../../middleware/createGuest");

const router = express.Router();

//~~~~~~~~~~~~~~~~~~
//~~ ROUTE REGISTER
//~~~~~~~~~~~~~~~~~~
router.route("/register")
  .post(validate("body", createSchema), controllerHandler(user.createProfile));

router.route("/guest")
  .post(createGuestProfile, controllerHandler(auth.guestLogin));

//~~~~~~~~~~~~~~
//~~ ROUTE LOGIN
//~~~~~~~~~~~~~~
router.route("/login")
  .post(validate("body", loginSchema), controllerHandler(auth.login));

router.route("/logout")
  .delete(controllerHandler(auth.logout));

router.route("/refresh")
  .get(controllerHandler(refreshToken));

module.exports = router;