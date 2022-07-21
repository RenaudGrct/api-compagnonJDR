const express = require("express");
const userController = require("../../controllers/user");

const router = express.Router();

router.route("/register")
  /**
    * POST /api/profile/register
    * @summary Insert new user in database
    * @tags Profile
    * @param {InputUser} request.body.required - user info
    * @return {User} 200 - success response - application/json
  */
  .post(userController.createUser);

router.route("/:id(\\d+)")
  /**
    * GET /api/profile/{id}
    * @summary Get an user profile by his PK
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {User} 200 - success response - application/json
  */
  .get(userController.findUser)
  /**
    * PATCH /api/profile/{id}
    * @summary Update current user informations in database
    * @tags Profile
    * @param {number} id.path.required - PK de l'utilisateur
    * @param {InputUser} request.body.required - informations de l'utilisateur
    * @return {User} 200 - success response - application/json
  */
  .patch(userController.updateUser)
  /**
    * DELETE /api/profile/{id}
    * @summary Delete current user in database
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {User} 200 - success response - application/json
  */
  .delete(userController.deleteUser);

module.exports = router;