// const debug = require("debug")("controllers:guest");
const ApiError = require("../errors/apiError");
const { guestDatamapper: guest } = require("../models");

module.exports = {
  /**
    * guest controller pour obtenir une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */
  async getProfile(req, res) {
    const userId = parseInt(req.params.id);
    const result = await guest.findByPk(userId);
    if (! result){
      throw new ApiError("Cet utilisateur n'existe pas", { statusCode : 404});
    }
    return res.json(result);
  },

//   async transformAccount (req, res) {
//     const guestId = parseInt(req.params.id);
//     const user = await profile.isExist(req.body);

//     if (user) {
//       unvailableFields(user, req.body);
//     }

//     // Chiffrage du mot de passe
//     const hash = await hashing(req.body.password);
//     req.body.password = hash;

//     await profile.insert(req.body);

//     // Mise à jour des personnages présent sur le compte invité transférant la valeur de la colonne guest_id vers user_id
//     const guestCharacters = await character.findAll();
//     if (guestCharacters) {
//       await character.update(guestId, [guestCharacters.id]);
//       const transferConfirmed = "Vos personnages ont été transférés sur votre nouveau compte d'utilisateur.";
//       return res.status(200).json(`Votre compte à bien été enregistré. ${transferConfirmed}`);
//     }

//     return res.status(200).json("Votre compte à bien été enregistré.");
//   }
};