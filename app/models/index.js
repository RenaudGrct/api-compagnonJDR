const userDatamapper = require("./user");
const guestDatamapper = require("./guest");
const racesDatamapper = require("./race");
const classesDatamapper = require("./classe");
const backgroundsDatamapper = require("./background");
const characterDatamapper = require("./character");
const abilityScoreDatamapper = require("./abilityScore");
const chosenSkillsDatamapper = require("./chosenSkills");
const chosenFeatureChoiceDatamapper = require("./chosenFeatureChoice");


// Ici on regroupe tous les datamapper pour utiliser un seul fichier et les renommer dans un require

module.exports = {
  userDatamapper,
  guestDatamapper,
  racesDatamapper,
  classesDatamapper,
  backgroundsDatamapper,
  characterDatamapper,
  abilityScoreDatamapper,
  chosenSkillsDatamapper,
  chosenFeatureChoiceDatamapper
};