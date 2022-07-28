const express = require("express");

// Importation du controller et le handler
// const { classesController : controller } = require("../../controllers");
// const controllerHandler = require("../../services/handlers/controllerHandler");
const classesJSON = require("../../../data/seeds/classes.json");


const router = express.Router();

//~~~~~~~~~~~~~~
//~~ SELECT CLASS
//~~~~~~~~~~~~~~
// router.route("/{index}")
router.route("/paladin")
/**
 * GET /api/classes/{index}
 * @summary Renvoie toutes les données liées à la classe selectionnée
 * @tags Classes (non fonctionnelle)
 * @param {string} name.path.required - index de la classe (paladin, warrior, ...)
 * @return {ClassSelected} 200 - success response - application/json
 * @return {ApiError} 400 - Bad request response - application/json
 * @return {ApiError} 401 - Invalid connection informations application/json
 * @return {ApiError} 404 - race not found - application/json
 */
  .get((req, res) => {
    res.status(200).json(classesJSON[0]);
  });

module.exports = router;