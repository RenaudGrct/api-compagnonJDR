const debug = require("debug")("app:login");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");
const guestDatamapper = require("../models/guest");
const { generateAccessToken, generateRefreshToken } = require("../services/Token/generateToken.js");
const cookieOptions = require("../config/cookieOptions");

module.exports = {
  async login(req, res) {
    const user = await userDatamapper.isExist(req.body);
    if (user) {
      // verification du mot de passe
      const check = await bcrypt.compare(req.body.password, user.password);
      if (check) {
        delete user.password;
        const accessToken = await generateAccessToken({
          username : user.username,
          email : user.email
        });
        const refreshToken = await generateRefreshToken({
          username : user.username,
          email: user.email
        });
        await userDatamapper.update(user.id, { refresh_token : refreshToken });
        res.cookie("jwt", refreshToken, cookieOptions);
        delete user.refresh_token;

        return res.status(200).json({ accessToken, user});
      }
    }
    throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  },

  async guestLogin(req, res) {
    const user = await guestDatamapper.isVecna(req.body);
    if (user) {
      // verification du mot de passe
      const check = await bcrypt.compare(req.body.password, user.password);
      if (check) {
        delete user.password;
        const accessToken = await generateAccessToken({
          username : user.username,
          email : user.email
        });
        const refreshToken = await generateRefreshToken({
          username : user.username,
          email: user.email
        });
        await userDatamapper.update(user.id, { refresh_token : refreshToken });

        res.cookie("jwt", refreshToken, cookieOptions);
        delete user.refresh_token;

        return res.status(200).json({ accessToken, user});
      }
    }
    throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  },

  async logout (req, res) {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    // Verifions si le refreshToken est en BDD
    const user = await userDatamapper.isExist({ refresh_token : refreshToken });

    if (!user) {
      res.clearCookies(cookieOptions);
      return res.sendStatus(204);
    }

    // Suppression du refreshToken en BDD
    await userDatamapper.update(user.id, { refresh_token : null });
    res.clearCookies(cookieOptions);
    res.sendStatus(204);

  }
};