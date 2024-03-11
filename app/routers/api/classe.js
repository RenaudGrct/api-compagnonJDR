const express = require("express");

// Importation du controller et le handler
const { classeController : classes } = require("../../controllers");
const controllerHandler = require("../../services/handlers/controllerHandler");


const router = express.Router();

//~~~~~~~~~~~~~~
//~~ SELECT CLASS
//~~~~~~~~~~~~~~
router.route("/:index")
  .get(controllerHandler(classes.getClassSelected));

module.exports = router;