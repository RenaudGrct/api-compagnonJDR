// const debug = require("debug")("controllers:backgrounds");
const ApiError = require("../errors/apiError.js");
const { backgroundsDatamapper: background } = require("../models");

module.exports = {
  /**
    * backgrounds controller pour obtenir toutes les entrées.
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getAllBackgrounds (req, res){
    //On requête la BDD si il existe une race demandé en req.params
    const backgrounds = await background.findAll();

    if (!backgrounds) {
      throw new ApiError("Aucuns historiques trouvés", { statusCode: 404 });
    }

    return res.status(200).json(backgrounds);
  }
};