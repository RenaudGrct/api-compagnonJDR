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
    * ajoute un personnage liés à l'utilisateur ou compte invité
    * @returns - Etat de l'aajout du personnage.
  */
  async insert(characterData){
    const fields = [];
    const params = [];
    const values = [];
    Object.entries(characterData).forEach(([key, value], index)=>{
      fields.push(`${key}`);
      params.push(`$${index +1}`);
      values.push(value);
    });

    const query = {
      text: `
      INSERT INTO cjdr."character" 
      (${fields.join(", ")})
      VALUES 
      (${params.join(", ")})
      RETURNING id`,
      values
    };

    const savedCharacter = await client.query(query);

    return savedCharacter.rows[0].id;
  },

  /**
    * Récupère tous les personnages liés à l'utilisateur
    * @returns {object} - Tous les personnages (nom, race, classe) de l'utilisateur.
  */
  async findAll(id){
    const field = [];
    const values = [];
    Object.entries(id).forEach(([key, value]) => {
      if (value) {
        field.push(`${key}`);
        values.push(value);
      }
    });

    const query = {
      text: `SELECT
      "name",
      "race"::json->'name' as race,
      "class"::json->'name' as class
      FROM cjdr.character_list WHERE ${field} = $1`,
      values
    };

    const result = await client.query(query);

    if (!result.rowCount === 0 ) {
      return null;
    }

    return result.rows;
  },

  /**
    * Récupère tous les personnages liés à l'utilisateur
    * @returns {object} - Tous les personnages et leurs caractéristique de l'utilisateur.
  */
  async findOne(id, characterId){
    //On cherche à renvoyer au front toutes les données liées à la classe trouvé.
    //Cela va demandé de faire des jointures et sous requêtes SQL pour y apporter
    //les données liées à cette classe.
    const field = [];
    const values = [];
    Object.entries(id).forEach(([key, value]) => {
      if (value) {
        field.push(`${key}`);
        values.push(value, characterId);
      }
    });

    const query = {
      text: `
      SELECT * FROM cjdr.character_list
      WHERE ${field} = $1 and id = $2
      `,
      values
    };

    const result = await client.query(query);

    if (!result.rowCount === 0 ) {
      return null;
    }

    return result.rows[0];
  },

  /**
   * @param {number} characterId L'id du personnage à supprimer
   * @returns Etat de la suppression
   */
  async delete(characterId){
    const query = {
      text: "DELETE FROM cjdr.character WHERE id = $1",
      values: [characterId]
    };

    const result = await client.query(query);

    return !!result.rowCount;
  }

};