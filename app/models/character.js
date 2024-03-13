const client = require("../services/database");

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
      if (["name"].includes(key)) {
        values.push(value);
      }else{
        values.push(parseInt(value));
      }
    });

    const query = {
      text: `
      INSERT INTO "character"
      (${fields.join(", ")})
      VALUES 
      (${params.join(", ")})
      RETURNING id`,
      values
    };

    const savedCharacter = await client.query(query);

    return savedCharacter.rows[0].id;
  },

  async update(userId, guestId) {

    const query = {
      text: `
      UPDATE "character"
      SET
      "user_id" = $1
      WHERE
      "guest_id" = $2
      `,
      values: [userId, guestId]
    };

    const updateCharacters = await client.query(query);

    return !!updateCharacters.rowCount;
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
        values.push(parseInt(value));
      }
    });

    const query = {
      text: `SELECT
      "id",
      "name",
      "race"::json->'name' as race,
      "class"::json->'name' as class
      FROM character_list WHERE ${field} = $1`,
      values
    };

    const result = await client.query(query);

    if (result.rowCount === 0 ) {
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
      SELECT * FROM character_list
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
      text: `DELETE FROM "character" WHERE id = $1`,
      values: [characterId]
    };

    const result = await client.query(query);

    return !!result.rowCount;
  }

};