const express = require("express");
const userController = require("../../controllers");

const router = express.Router();

router.route("/register")
  /**
    * POST /api/profile/register
    * @summary Insert new user in database
    * @tags Profile
    * @param {inputUser} request.body.required - user info
    * @return {user} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
  */
  .post(userController.insert);

router.route("/:id(\\d+)")
  /**
    * GET /api/profile/{id}
    * @summary Get an user profile by his PK
    * @tags Profile
    * @return {user} 200 - success response - application/json
  */
  .get(userController.findUserbyPK)
  /**
    * PATCH /api/profile/{id}
    * @summary Update current user informations in database
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {user} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
  */
  .patch(userController.update)
  /**
    * DELETE /api/profile/{id}
    * @summary Delete current user in database
    * @tags Profile
    * @param {number} id.path.required - user PK
    * @return {user} 200 - success response - application/json
    * @return {ApiError} 400 - Bad request response - application/json
    * @return {ApiError} 404 - Category not found - application/json
  */
  .delete(userController.delete);

module.exports = router;