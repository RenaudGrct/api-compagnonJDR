// // const debug = require("debug")("controllers:guest");
// const { unvailableFields } = require("../services/unvailableFields");
// const {
//   guestDatamapper: guest,
//   userDatamapper: profile
// } = require("../models/");
// const { hashing } = require("../services/hashPassword.js");

// module.exports = {
//   async createProfile(req, res) {
//     const user = await profile.isExist(req.body);
//     if (user) {
//       unvailableFields(user, req.body);
//     }
//     // Chiffrage du mot de passe
//     const hash = await hashing(req.body.password);
//     req.body.password = hash;

//     await guest.insert(req.body);

//     return res.status(200).json("Votre compte à bien été enregistré");
//   };

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
// };