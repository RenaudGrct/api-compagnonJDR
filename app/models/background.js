// const debug = require("debug")("models:backgrounds");
const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
/**
  * @typedef {object} Backgrounds
  * @property {number} id - Identifiant unique (PK)
  * @property {string} name - Nom de l'historique
  * @property {number} additional_language - Nombre de langues supplémentaire acquises
  * @property {string} ability - Nom de la capacitée liée à l'historique
  * @property {string} ability_description - Description de la capacité
  * @property {array<string>} skills - Aptitudes maîtrisées liées à l'historique
*/
//~~~~~~~~

module.exports = {
  /**
    * Récupère toutes les données des historiques
    * @returns {object} - Toutes les informations de tous les hitorique en BDD.
  */
  async findAll(){

    const query = {
      text: "", //TODO string de la requête en BDD à faire
    };

    // const result = await client.query(query); //TODO en attente du texte de la requête SQL

    // if (!result.rowCount === 0 ) {
    //   return null;
    // }

    // return result.rows;
  }
};