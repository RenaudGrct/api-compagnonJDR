const express = require("express");

// Importation du controller et le handler
const { classeController : classes } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");


const router = express.Router();

//~~~~~~~~~~~~~~
//~~ SELECT CLASS
//~~~~~~~~~~~~~~
router.route("/:index")
/**
 * GET /api/classes/{index}
 * @summary Renvoie toutes les données liées à la classe selectionnée
 * @tags Création du personnage
 * @param {string} name.path.required - index de la classe - enum: Paladin, Guerrier
 * @return {ClassSelected} 200 - success response - application/json
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 401 - Invalid connection informations application/json
 * @return {ApiError} 404 - race not found - application/json
 */
  .get(controllerHandler(classes.getClassSelected));

module.exports = router;