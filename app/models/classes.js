const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
/**
  * @typedef {object} Classes
  * @property {number} id - Identifiant unique (PK)
  * @property {string} name - Nom de la race
  * @property {array<object>} proficiencies - Compétences liées à la classe
  * @property {array<object>} saving_throw - Jet de sauvegarde liée à la classe
  * @property {array<Object>} skills - Aptitudes maîtrisées liées à la classe
  * @property {array<object>} features - caractéristiques liées à la classe
  * @property {boolean} night_vision - Vision nocturne
*/
//~~~~~~~~

module.exports = {
  /**
    * Récupère toutes les données liées à la classe
    * @returns {object} - Toutes les informations nécessaires de la classe choisie.
  */
  async findOne(classIndex){
    //On cherche à renvoyer au front toutes les données liées à la classe trouvé.
    //Cela va demandé de faire des jointures et sous requêtes SQL pour y apporter
    //les données liées à cette classe.

    const query = {
      text: "", //TODO string de la requête en BDD à faire
      values: [classIndex.name]
    };

    // const result = await client.query(query); //TODO en attente du texte de la requête SQL

    // if (!result.rowCount === 0 ) {
    //   return null;
    // }

    // return result.rows[0];
  }
};