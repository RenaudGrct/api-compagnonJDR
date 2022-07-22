const express = require("express");

// Importation du service de validation Joi et ses schema.
const validate = require("../../services/validation/validator");
const createSchema = require("../../services/validation/schemas/userCreateSchema");
const updateSchema = require("../../services/validation/schemas/userUpdateSchema");
const loginSchema = require("../../services/validation/schemas/loginSchema");

const { userController } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

router.route("/register")
  /**
    * POST /api/profile/register
    * @summary Insertion d'un nouvel utilisateur en BDD
    * @tags Profile
    * @param {InputUser} request.body.required - user info
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile note found - application/json
  */
  .post(validate("body", createSchema), controllerHandler(userController.createProfile));

router.route("/:id(\\d+)")
  /**
    * GET /api/profile/{id}
    * @summary Renvoie le profile d'un utilisateur
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile note found - application/json
  */
  .get(controllerHandler(userController.getProfile))
  /**
    * PATCH /api/profile/{id}
    * @summary Mise à jour du profile de l'utilisateur
    * @tags Profile
    * @param {number} id.path.required - PK de l'utilisateur
    * @param {InputUser} request.body.required - informations de l'utilisateur
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile note found - application/json
  */
  .patch(validate("body", updateSchema), controllerHandler(userController.updateProfile))
  /**
    * DELETE /api/profile/{id}
    * @summary Suppression du compte de l'utilisateur en BDD
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Profile note found - application/json
  */
  .delete(controllerHandler(userController.deleteProfile));

router.route("/login")
  /**
    * POST /api/login
    * @summary Vérification de l'existance de l'utilisateur en BDD
    * @tags Login
    * @param {LoginUser} request.body.required - informations de connexion
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connexion informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .post(validate("body", loginSchema),controllerHandler(userController.login));

module.exports = router;