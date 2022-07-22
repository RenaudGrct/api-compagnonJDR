const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");


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
    const result = await userDatamapper.insert(req.body);
    res.send(result);
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
    if (user) {
      let field;
      if (user.username === req.body.username) {
        field = "ce nom d'utilisateur";
      }
      if (user.email === req.body.email) {
        field = "cette adresse mail";
      }
      throw new ApiError (`Un profil existe déjà avec ${field}`, { statusCode : 404 });
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