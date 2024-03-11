const express = require("express");

const apiRouter = require("./api");
const router = express.Router();
const { errorHandler } = require("../services/handlers/errorHandler");

// On préfixe les routers à utilisé (ici on utilisera qu'un router pour l'api)
router.use("/api", apiRouter);

// Route pour le gestionnaire d'erreur
router.use((err, _, res, next) => {
  errorHandler(err, res, next);
});

module.exports = router;