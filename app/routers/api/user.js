const express = require("express");

// Importation du service de validation Joi et ses schema.
const validate = require("../../services/validation/validator");
const createSchema = require("../../services/validation/schemas/userCreateSchema");
const updateSchema = require("../../services/validation/schemas/userUpdateSchema");
const loginSchema = require("../../services/validation/schemas/loginSchema");

// Importation du controller et le handler
const { userController : controller } = require("../../controllers");
const { authController : auth } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

// Importation des middleware
const { authentificateToken } = require("../../services/Token/authMiddleware");
const { refreshToken } = require("../../services/Token/refreshToken");
const { createGuestProfile } = require ("../../services/guestMiddleware");

const router = express.Router();

router.route("/register")
  /**
    * POST /api/profile/register
    * @summary Insertion d'un nouvel utilisateur en BDD
    * @tags Profile
    * @param {InputUser} request.body.required - user info
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(validate("body", createSchema), controllerHandler(controller.createProfile));

router.route("/guest")
  /**
    * POST /api/profile/guest
    * @summary Création d'un compte invité suivi d'un login
    * @tags Login
    * @return {GuestLogged} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(createGuestProfile, controllerHandler(auth.guestLogin));

router.route("/:id(\\d+)")
  /**
    * GET /api/profile/{id}
    * @summary Renvoie le profil d'un utilisateur
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .get(authentificateToken, controllerHandler(controller.getProfile))
  /**
    * PATCH /api/profile/{id}
    * @summary Mise à jour du profil de l'utilisateur
    * @tags Profile
    * @param {number} id.path.required - PK de l'utilisateur
    * @param {InputUser} request.body.required - informations de l'utilisateur
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .patch(validate("body", updateSchema), controllerHandler(controller.updateProfile))
  /**
    * DELETE /api/profile/{id}
    * @summary Suppression du compte de l'utilisateur en BDD
    * @tags Profile
    * @param {number} id.path.required - PK de l'utilisateur
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile note found - application/json
  */
  .delete(controllerHandler(controller.deleteProfile));

router.route("/login")
  /**
    * POST /api/profile/login
    * @summary Vérification de l'existance de l'utilisateur en BDD
    * @tags Login
    * @param {LoginUser} request.body.required - informations de connexion
    * @return {UserLogged} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(validate("body", loginSchema),controllerHandler(auth.login));

router.route("/token")
  /**
    * POST /api/profile/token
    * @summary Génère un nouvel Access Token via le refresh Token de l'utilisateur
    * @tags Login
    * @param {User} request.body.required - informations de connexion
    * @return {UserLogged} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 403 - Forbidden application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(refreshToken);

router.route("/logout")
  /**
    * DELETE /api/profile/logout
    * @summary Deconnexion de l'utilisateur
    * @tags Login
    * @return {string} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .delete(auth.logout);

module.exports = router;