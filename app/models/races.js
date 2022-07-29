const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
/**
  * @typedef {object} Classes
  * @property {number} id - Identifiant unique (PK)
  * @property {string} name - Nom de la race
  * @property {string} speed - Vitesse de marche
  * @property {array<object>} score_modifier - Modificateur de score
  * @property {number} additional_language - Nombre de langues supplémentaire acquises
  * @property {array<string>} language - Langue parlée
  * @property {array<object>} racial_ability - Traits raciaux
  * @property {boolean} night_vision - Vision nocturne
*/
//~~~~~~~~

module.exports = {
  /**
    * Récupère toutes les données liées à la race
    * @returns {object} - Toutes les informations nécessaires de la race choisie.
  */
  async findOne(raceIndex){
    //On cherche à renvoyer au front toutes les données liées à la race trouvé.
    //Cela va demandé de faire des jointures et sous requêtes SQL pour y apporter
    //les données liées à cette race.

    const query = {
      text: "", //TODO string de la requête en BDD à faire
      values: [raceIndex.name]
    };

    // const result = await client.query(query); //TODO en attente du texte de la requête SQL

    // if (!result.rowCount === 0 ) {
    //   return null;
    // }

    // return result.rows[0];
  }
};