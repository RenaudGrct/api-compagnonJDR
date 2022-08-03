const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
// /**
//   * @typedef {object} Character
//   * @property {number} id - Identifiant unique (PK)
//   * @property {string} name - Nom de la race
//   * @property {array<object>} proficiencies - Compétences liées à la classe
//   * @property {array<string>} saving_throw - Jet de sauvegarde liée à la classe
//   * @property {array<string>} skills - Aptitudes maîtrisées liées à la classe
//   * @property {array<object>} feature - caractéristiques liées à la classe
// */
//~~~~~~~~

module.exports = {
  /**
    * Récupère tous les personnagtes liés à l'utilisateur
    * @returns {object} - Tous les personnages et leurs caractéristique de l'utilisateur.
  */
  async findAll(userId){
    //On cherche à renvoyer au front toutes les données liées à la classe trouvé.
    //Cela va demandé de faire des jointures et sous requêtes SQL pour y apporter
    //les données liées à cette classe.

    const query = {
      text: "SELECT * FROM cjdr.character_list WHERE character_list.user_id = $1",
      values: [userId]
    };

    const result = await client.query(query);

    if (!result.rowCount === 0 ) {
      return null;
    }

    return result.rows[0];
  }
};