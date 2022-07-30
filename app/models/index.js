const userDatamapper = require("./user");
const guestDatamapper = require("./guest");
const racesDatamapper = require("./races");
const classesDatamapper = require("./classes");
const backgroundsDatamapper = require("./backgrounds");


// Ici on regroupe tous les datamapper pour utiliser un seul fichier et les renommer dans un require

module.exports = {
  userDatamapper,
  guestDatamapper,
  racesDatamapper,
  classesDatamapper,
  backgroundsDatamapper
};