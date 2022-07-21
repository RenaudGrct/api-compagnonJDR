const express = require("express");

const router = express.Router();
const { apiController } = require("../../controllers");
const userController = require("../../controllers/user");

// Route par défaut de l'API
router.all("/", apiController.home);


// Toutes les routes de notre API
router.post("/api/register", userController.createUser);
router.get("/api/profile/:id", userController.findUser);
router.patch("/api/profile/:id", userController.updateUser);
router.delete("/api/profile/:id",userController.deleteUser);



module.exports = router;