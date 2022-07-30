const express = require("express");

// Importation du controller et le handler
const { raceController : race } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");

const router = express.Router();

//~~~~~~~~~~~~~~
//~~ SELECT RACE
//~~~~~~~~~~~~~~
router.route("/{index}")
/**
 * GET /api/races/{index}
 * @summary Renvoie toutes les données liées à la race selectionnée
 * @tags Races (non fonctionnelles)
 * @param {string} name.path.required - index de la race (dragonborn, human, ...)
 * @return {RaceSelected} 200 - success response - application/json
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 401 - Invalid connection informations application/json
 * @return {ApiError} 404 - race not found - application/json
 */
  .get(controllerHandler(race.getRaceSelected));

module.exports = router;