const ApiError = require("../errors/apiError.js");
const {
  characterDatamapper: character,
  abilityScoreDatamapper: score,
  chosenSkillsDatamapper: chosenSkills,
  chosenFeatureChoiceDatamapper: chosenFeatureChoice
} = require("../models");

module.exports = {
  /**
    * character controller pour créer une entrée.
    * ExpressMiddleware signature
    * @param {string} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async createOneCharacter (req, res) {
    const data = req.body.character;
    if (req.params.userId) {
      data.user_id = parseInt(req.params.userId);
    }

    if (req.params.guestId) {
      data.guest_id = parseInt(req.params.guestId);
    }

    const abilityScoreId = await score.insert(req.body.ability_score);
    data.ability_score_id = abilityScoreId;
    console.debug("🚀 ~ data", data)
    const characterId = await character.insert(data);

    await chosenSkills.insert(characterId, req.body.skill_id);

    if (req.body.feature_choice_id) {
      await chosenFeatureChoice.insert(characterId, req.body.feature_choice_id);
    }

    return res.status(200).json(`${req.body.character.name} à été ajouté à vos personnages`);
  },

  /**
    * character controller pour récupérer plusieurs entrées.
    * ExpressMiddleware signature
    * @param {string} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getAllCharacters (req, res){

    const foundedCharacter = await character.findAll({ user_id : req.params.userId, guest_id: req.params.guestId });

    if (!foundedCharacter) {
      throw new ApiError("Vous n'avez aucun personnages de sauvegardés", { statusCode: 404 });
    }

    return res.status(200).json(foundedCharacter);
  },

  /**
    * character controller pour récupérer une entrées.
    * ExpressMiddleware signature
    * @param {string} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getOneCharacter (req, res){
    const characterId = req.params.characterId;
    //On requête la BDD si il existe une classe demandé en req.params
    const foundedCharacter = await character.findOne({ user_id: req.params.userId, guest_id: req.params.guestId }, characterId);

    if (!foundedCharacter) {
      throw new ApiError("Ce personnage s'est perdu dans les limbes", { statusCode: 404 });
    }

    return res.status(200).json(foundedCharacter);
  },

  /**
    * character controller pour supprimer une entrée.
    * ExpressMiddleware signature
    * @param {string} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async destroyOneCharacter (req, res){

    const result = await character.delete(req.params.characterId);

    if (!result) {
      throw new ApiError("Le personnage est introuvable ou à déjà été supprimé", { statusCode : 404 });
    }

    return res.status(200).json("Votre personnage à bien été supprimé");
  }
};