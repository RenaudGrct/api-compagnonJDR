const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const { apiController } = require("../../controllers");
const { ApiError } = require("../../services/handlers/errorHandler");

// Route par défaut de l'API qui renvoie le liens de la documention de notre API
router.all("/", apiController.home);


// Toutes les routes de notre API
router.use("/profile", userRouter);

// 404 pour les routes de l'API et création de l'erreur customisée.
router.use(() => {
  throw new ApiError("Route d'API non trouvée", { statusCode: 404 });
});

module.exports = router;