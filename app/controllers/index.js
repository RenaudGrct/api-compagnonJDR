require("dotenv").config();
const userController = require("./user");
const authController = require("./auth");

const apiController = {
  /**
     * Default API controller to show documention url.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
  home(req, res) {
    const fullUrl = `${req.protocol}://${req.get("host")}`;
    return res.json({
      documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
    });
  },
};

module.exports = {
  apiController,
  userController,
  authController
};