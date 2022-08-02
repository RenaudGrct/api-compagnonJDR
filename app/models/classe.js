// const debug = require("debug")("models:classes");
const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
/**
  * @typedef {object} ClassSelected
  * @property {number} id - Identifiant unique (PK)
  * @property {string} name - Nom de la race
  * @property {array<object>} proficiencies - Compétences liées à la classe
  * @property {array<string>} saving_throw - Jet de sauvegarde liée à la classe
  * @property {array<string>} skills - Aptitudes maîtrisées liées à la classe
  * @property {array<object>} features - caractéristiques liées à la classe
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
      text: "SELECT * FROM cjdr.class_list WHERE LOWER(class_list.name) = LOWER($1)",
      values: [classIndex]
    };

    const result = await client.query(query);

    if (!result.rowCount === 0 ) {
      return null;
    }

    return result.rows[0];
  }
};