const debug = require("debug")("app:login");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");
const { generateAccessToken, generateRefreshToken } = require("../services/Token/generateToken.js");


module.exports = {
  async login(req, res) {
    debug("body du login : ", req.body);
    const { password } = req.body;

    const user = await userDatamapper.isExist(req.body);
    if (user) {
      debug("utilisateur trouvé : ", user);
      // verification du mot de passe
      const check = await bcrypt.compare(password, user.password);
      debug("le mot de passe est-il bon :", check);
      if (check) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        return res.status(200).json({ accessToken, refreshToken});
      }
    }
    throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  }
};