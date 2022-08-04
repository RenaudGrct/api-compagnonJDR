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
  /**
    * GET /api/profile/{id}
    * @summary Renvoie le profil d'un utilisateur
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .get(controllerHandler(user.getProfile))
  /**
    * PATCH /api/profile/{id}
    * @summary Mise à jour du profil de l'utilisateur
    * @tags Profile
    * @param {number} id.path.required - PK de l'utilisateur
    * @param {InputUser} request.body.required - informations de l'utilisateur
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .patch(validate("body", updateSchema), controllerHandler(user.updateProfile))
  /**
    * DELETE /api/profile/{id}
    * @summary Suppression du compte de l'utilisateur en BDD
    * @tags Profile
    * @param {number} id.path.required - PK de l'utilisateur
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile note found - application/json
  */
  .delete(controllerHandler(user.deleteProfile));

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~ CREATE USER ACCOUNT FROM GUEST
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// router.route("/{id}/confirm-register")
  // /**
  //   * POST /api/auth/confirm-register
  //   * @summary Création d'un nouveau compte utilisateur à partir d'un profil invité
  //   * @tags Profile (non fonctionnelle)
  //   * @param {number} id.path.required - PK de l'invité
  //   * @param {InputUser} request.body.required - user info
  //   * @return {User} 200 - success response - application/json
  //   * @return {ApiError} 400 - Bad request response - application/json
  //   * @return {ApiError} 404 - Profile not found - application/json
  // */
  // .post(validate("body", createSchema), controllerHandler(guest.transformAccount));

module.exports = router;