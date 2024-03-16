require("dotenv").config();
const debug = require("debug")("services:refresh");
const ApiError = require("../../errors/apiError");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./generateToken");
const userDatamapper = require("../../models/user");

module.exports = {
  async refreshToken (req, res){
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      throw new ApiError(
        "Vous devez être connecté pour accèder à cette page",
        { statusCode : 401 }
      );
    }
    const refreshToken = cookies.jwt;
    const user = await userDatamapper.isExist({ refresh_token : refreshToken });
    if (!user) {
      throw new ApiError(" Accès non autorisé ", { statusCode : 403 });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) =>{
      if (err) {
        throw new ApiError(" Accès non autorisé ", { statusCode : 403 });
      }
      delete user.iat;
      delete user.exp;
      const accessToken = await generateAccessToken({
        username: user.username,
        email: user.email
      });
      return res.status(200).json(accessToken);
    });
  }
};