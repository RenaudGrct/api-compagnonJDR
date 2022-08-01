// const debug = require("debug")("controllers:races");
const ApiError = require("../errors/apiError.js");
const { racesDatamapper : races } = require("../models");

module.exports = {
  /**
    * races controller pour obtenir une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getRaceSelected (req, res){
    const raceIndex = req.params.index;
    // On requête la BDD si il existe une race demandé en req.params
    const foundedRace = await races.findOne(raceIndex);

    if (!foundedRace) {
      throw new ApiError("Aucune races trouvées", { statusCode: 404 });
    }

    return res.status(200).json(foundedRace);
  }
};