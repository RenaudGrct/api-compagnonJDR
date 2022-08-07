require("dotenv").config();
// const debug = require("debug")("controllers:auth");
const bcrypt = require("bcrypt");
const ApiError = require("../errors/apiError.js");
const {
  userDatamapper: userDM,
  guestDatamapper : guestDM
} = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../services/Token/generateToken.js");
const cookieOptions = require("../config/cookieOptions");

module.exports = {
  async login(req, res) {
    const user = await userDM.isExist(req.body);
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
        await userDM.update(user.id, { refresh_token : refreshToken });
        res.cookie("jwt", refreshToken, cookieOptions);
        delete user.refresh_token;

        return res.status(200).json({ accessToken, user});
      }
    }
    throw new ApiError("Informations de connexion invalides", { statusCode : 401 });
  },

  async guestLogin(req, res) {
    const guest = await guestDM.isVecna(req.body);
    if (guest) {
      // verification du mot de passe
      const check = await bcrypt.compare(req.body.password, guest.password);
      if (check) {
        delete guest.password;
        const accessToken = await generateAccessToken({
          username : guest.username,
          email : guest.email
        });
        const refreshToken = await generateRefreshToken({
          username : guest.username,
          email: guest.email
        });
        await guestDM.update(guest.id, { refresh_token : refreshToken });

        res.cookie("jwt", refreshToken, cookieOptions);
        delete guest.refresh_token;

        return res.status(200).json({ accessToken, guest });
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
    const user = await userDM.isExist({ refresh_token : refreshToken });

    if (!user) {
      res.clearCookies("jwt", cookieOptions);
      return res.sendStatus(204);
    }

    // Suppression du refreshToken en BDD
    await user.update(user.id, { refresh_token : null });
    res.clearCookies("jwt", cookieOptions);
    res.sendStatus(204);

  }
};