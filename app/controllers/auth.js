const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");


module.exports = {
  async login(req, res) {
    const { password } = req.body;

    const user = await userDatamapper.isExist(req.body);
    if (user) {
      // verification du mot de passe
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        delete user.dataValues.password;
        return res.status(200);
      }
    }
    throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  }
};