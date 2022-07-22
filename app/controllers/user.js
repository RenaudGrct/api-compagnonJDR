const userDatamapper = require("../datamappers/user.js");

const userController = {

  async findUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const result = await userDatamapper.findByPk(userId);
      res.json(result);
    } catch (error) {
    // res.status(error.response.status).send("Une erreur est survenue");
      console.log(error);
    }
  },

  async createUser(req, res) {
    try {
      const result = await userDatamapper.insert(req.body);
      res.send(result);
    } catch (error) {
      // res.status(error.response.status).send("Une erreur est survenue");
      console.log(error);
    }

  },

  async updateUser(req, res) {
    try {

      const userId = parseInt(req.params.id);
      const result = await userDatamapper.findByPk(userId);
      if (!result) {
        return res.status(404).json("Modification impossible");
      }
      await userDatamapper.update(userId, req.body);
      return res.status(200).json("Modification réussie");
    } catch (error) {
      // res.status(error.response.status).send("Une erreur est survenue");
      console.log(error);
    }
  },

  async deleteUser(req, res) {
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