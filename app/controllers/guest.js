// const debug = require("debug")("controllers:guest");
const ApiError = require("../errors/apiError");
const {
  guestDatamapper: guestDM,
  characterDatamapper: characterDM,
  userDatamapper: userDM
} = require("../models");
const { hashing } = require("../services/hashPassword");
const { unvailableFields } = require("../services/unvailableFields");

module.exports = {
  /**
    * guest controller pour obtenir une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getProfile(req, res) {
    const guestId = parseInt(req.params.id);
    const result = await guestDM.findByPk(guestId);
    if (! result){
      throw new ApiError("Cet utilisateur n'existe pas", { statusCode : 404});
    }
    return res.json(result);
  },

  async transformAccount (req, res) {
    const guestId = parseInt(req.params.guestId);
    const userExist = await userDM.isExist(req.body);

    if (userExist) {
      unvailableFields(userExist, req.body);
    }

    // Chiffrage du mot de passe
    const hash = await hashing(req.body.password);
    req.body.password = hash;

    const newUser = await userDM.insert(req.body);

    // On va chercher tous les personnages du compte invité
    const guestCharacters = await characterDM.findAll({ guest_id : guestId });
    let successMessage = " Votre compte à bien été enregistré.";
    if (guestCharacters) {
      // Mise à jour des personnages présent sur le compte invité transférant la valeur de la colonne guest_id vers user_id
      await characterDM.update(newUser, guestId);
      successMessage += " Vos personnages ont été transférés sur votre nouveau compte d'utilisateur.";
    }
    successMessage += " Veuillez vous reconnecter avec votre nouveau compte utlisateur";
    return res.status(200).json({ successMessage });
  }
};