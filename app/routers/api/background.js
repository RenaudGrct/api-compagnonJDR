const express = require("express");

// Importation du controller et le handler
const { backgroundController : background } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

//~~~~~~~~~~~~~~~~~~~~
//~~ SELECT BACKGROUND
//~~~~~~~~~~~~~~~~~~~~
router.route("/")
/**
 * GET /api/backgrounds
 * @summary Renvoie tous les Historiques
 * @tags Background (non fonctionnelle)
 * @return {Race} 200 - success response - application/json
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 401 - Invalid connection informations application/json
 * @return {ApiError} 404 - race not found - application/json
 */
  .get(controllerHandler(background.getAllBackgrounds));

module.exports = router;