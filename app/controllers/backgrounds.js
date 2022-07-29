const debug = require("debug")("controllers:races");
const ApiError = require("../errors/apiError.js");
const backgroundsDatamapper = require("../models/backgrounds.js");
const backgroundsJSON = require("../../data/seeds/backgrounds.json");

module.exports = {
  /**
    * backgrounds controller pour obtenir toutes les entrées.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getAllBackgrounds (req, res){
    //On requête la BDD si il existe une race demandé en req.params
    // const backgrounds = await backgroundsDatamapper.findAll(); //TODO connection et requête BDD

    // if (!backgrounds) {
    //   throw new ApiError("Aucuns historiques trouvés", { statusCode: 404 });
    // }

    return res.status(200).json(backgroundsJSON);
  }
};