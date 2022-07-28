const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
/**
  * @typedef {object} Races
  * @property {number} id - Identifiant unique (PK)
  * @property {string} name - Nom de la race
  * @property {string} speed - Vitesse de marche
  * @property {array<object>} score_modifier - Modificateur de score
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
  async findOne(race){
    //On cherche à renvoyer au front toutes les données liées à la race trouvé.
    //Cela va demandé de faire des jointures et sous requêtes SQL pour y apporter
    //les données liées à cette race.

    const query = {
      text: "", //TODO string de la requête en BDD à faire
      values: [race.name]
    };

    const result = await client.query(query);

    if (!result.rowCount === 0 ) {
      return null;
    }

    return result.rows[0];
  }
};