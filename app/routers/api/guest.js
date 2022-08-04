const express = require("express");

// Importation du controller et le handler
const { guestController: guest } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

//~~~~~~~~~~~
//~~ PROFILE
//~~~~~~~~~~~
router.route("/:id(\\d+)")
  /**
    * GET /api/guest/{id}
    * @summary Renvoie le profil d'un invité
    * @tags Guest
    * @param {number} id.path.required - guest PK
    * @return {User} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 401 - Invalid connection informations application/json
    * @return {ApiError} 404 - Profile not found - application/json
  */
  .get(controllerHandler(guest.getProfile));

module.exports = router;