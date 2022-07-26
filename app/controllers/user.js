const debug = require("debug")("app:controllers");
const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");
const { hashing } = require("../services/hashPassword.js");
const bcrypt = require("bcrypt");


module.exports = {
  /**
    * User controller pour obtenir une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getProfile(req, res) {
    const userId = parseInt(req.params.id);
    const result = await userDatamapper.findByPk(userId);
    if (! result){
      throw new ApiError("Cet utilisateur n'existe pas", { statusCode : 404});
    }
    return res.json(result);
  },

  /**
    * User controller pour créer une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async createProfile(req, res) {
    const user = await userDatamapper.isExist(req.body);
    if (user) {
      let field;
      if (user.username === req.body.username) {
        field = "ce nom d'utilisateur";
      }
      if (user.email === req.body.email) {
        field = "cette adresse mail";
      }
      throw new ApiError (`Un profile existe déjà avec ${field}`, { statusCode : 404 });
    }
    // Chiffrage du mot de passe
    const hash = await hashing(req.body.password);
    req.body.password = hash;
    await userDatamapper.insert(req.body);
    return res.status(200).json("Votre compte à bien été enregistré");
  },

  /**
    * User controller pour mettre à jour une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async updateProfile(req, res) {
    const userId = parseInt(req.params.id);
    const user = await userDatamapper.findByPk(userId);
    if (!user) {
      throw new ApiError("Cet utilisateur n'existe pas", { statusCode : 404 });
    }
    const check = await bcrypt.compare(req.body.password, user.password);

    if (!check) {
      throw new ApiError("Mot de passe incorrect", { statusCode : 401 });
    }
    if(req.body.newPassword){
      const hash = await hashing(req.body.newPassword);
      req.body.password = hash;
    }

    if (req.body.email || req.body.username) {
      const isUserExist = await userDatamapper.isExist(req.body, userId);
      if (isUserExist) {
        let field;
        if (isUserExist.username === req.body.username) {
          field = "ce nom d'utilisateur";
        }
        if (isUserExist.email === req.body.email) {
          field = "cette adresse mail";
        }
        throw new ApiError (`Un profil existe déjà avec ${field}`, { statusCode : 404 });
      }
    }
    await userDatamapper.update(userId, req.body);
    return res.status(200).json("Votre profil à bien été mis à jour");
  },

  /**
    * User controller pour supprimer une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async deleteProfile(req, res) {
    const userId = parseInt(req.params.id);
    const result = await userDatamapper.delete(userId);
    if (!result) {
      throw new ApiError("Une erreur est survenue : l'utilisateur est introuvable", { statusCode : 404 });
    }
    return res.status(200).json("Votre compte a bien été supprimé");
  }
};