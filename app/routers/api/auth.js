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
  /**
    * POST /api/auth/register
    * @summary Création d'un nouveau compte utilisateur
    * @tags Authentification
    * @param {InputUser} request.body.required - user info
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(validate("body", createSchema), controllerHandler(user.createProfile));

router.route("/guest")
  /**
    * POST /api/auth/guest
    * @summary Création d'un compte invité automatiquement authentifié
    * @tags Authentification
    * @return {GuestLogged} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(createGuestProfile, controllerHandler(auth.guestLogin));

//~~~~~~~~~~~~~~
//~~ ROUTE LOGIN
//~~~~~~~~~~~~~~
router.route("/login")
  /**
    * POST /api/auth/login
    * @summary Vérification des informations de connexion de l'utilisateur en BDD
    * @tags Authentification
    * @param {LoginUser} request.body.required - informations de connexion
    * @return {UserLogged} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(validate("body", loginSchema), controllerHandler(auth.login));

router.route("/logout")
  /**
    * DELETE /api/auth/logout
    * @summary Deconnexion de l'utilisateur avec suppression des Tokens
    * @tags Authentification
    * @return {string} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .delete(auth.logout);

router.route("/refresh")
  /**
    * GET /api/auth/refresh
    * @summary Génère un nouvel Access Token via le refresh Token de l'utilisateur
    * @tags Authentification
    * @param {User} request.body.required - informations de connexion
    * @return {UserLogged} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 403 - Forbidden application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .get(refreshToken);

module.exports = router;