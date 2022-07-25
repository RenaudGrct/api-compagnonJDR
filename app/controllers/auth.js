const debug = require("debug")("app:login");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");
const { generateAccessToken, generateRefreshToken } = require("../services/Token/generateToken.js");

module.exports = {
  async login(req, res) {

    const user = await userDatamapper.isExist(req.body);
    if (user) {
      // verification du mot de passe
      const check = await bcrypt.compare(req.body.password, user.password);
      if (check) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        return res.status(200).json({ accessToken, refreshToken});
      }
    }
    throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  },

  // async guestLogin(req, res, guestData) {
  //   const user = await userDatamapper.isExist(guestData);
  //   if (user) {
  //     // verification du mot de passe
  //     const check = await bcrypt.compare(guestData.password, user.password);
  //     if (check) {
  //       const accessToken = await generateAccessToken(user);
  //       const refreshToken = await generateRefreshToken(user);
  //       return res.status(200).json({ accessToken, refreshToken});
  //     }
  //   }
  //   throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  // },

  async logout (req, res) {
    res.sendStatus(204);
  }
};