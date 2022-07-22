const ApiError = require("../errors/apiError.js");
const userDatamapper = require("../models/user.js");

const userController = {

  async getProfile(req, res) {
    const userId = parseInt(req.params.id);
    const result = await userDatamapper.findByPk(userId);
    if (! result){
      throw new ApiError("Cet utilisateur n'existe pas", { statusCode : 404});
    }
    return res.json(result);
  },

  async createProfile(req, res) {
    const result = await userDatamapper.insert(req.body);
    res.send(result);
  },

  async updateProfile(req, res) {
    try {

      const userId = parseInt(req.params.id);
      const result = await userDatamapper.findByPk(userId);
      if (!result) {
        return res.status(404).json("Modification impossible");
      }
      await userDatamapper.update(userId, req.body);
      return res.status(200).json("Modification réussie");
    } catch(error) {
      // res.status(error.response.status).send("Une erreur est survenue");
      console.log(error);
    }
  },

  async deleteProfile(req, res) {
    try {
      const userId = parseInt(req.params.id);
      await userDatamapper.delete(userId);
      return res.status(200).json("L'utilisateur a été supprimé");
    } catch (error) {
      // res.status(error.response.status).send("Une erreur est survenue");
      console.log(error.response.status);
    }
  }

};

module.exports = userController;