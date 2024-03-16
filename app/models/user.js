// const debug = require("debug")("models:user");
const client = require("../services/database");

module.exports = {
  /**
    * Récupère l'utilisateur selon son id
    * @returns L'utilisateur existant en BDD
  */
  async findByPk(userId) {
    const query = {
      text:`
      SELECT
      id,
      "username",
      "email",
      "password"
      FROM "user"
      WHERE id = $1`,
      values: [userId]
    };
    const result = await client.query(query);

    if(result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
  },

  /**
   * Ajoute un utilisateur en BDD
   * @param {inputUser} user - l'utilisateur à insérer
   * @returns L'utilisateur insérer
   */
  async insert(body) {
    const {email, username, password} = body;
    const query = {
      text:`
      INSERT INTO "user" 
      (email, username, password) 
      VALUES ($1, $2, $3)
      RETURNING id`,
      values:[email, username, password]
    };
    const savedUser = await client.query(query);
    //On transforme en booléen le result pour l'envoi d'un message de confirmation si tout s'est bien passé (ou non)
    return savedUser.rows[0].id;
  },

  /**
   * @param {number} userId PK de l'utilisateur
   * @param {Object} userData input de l'utilisateur à update en BDD
   * @returns Etat de l'update
   */
  async update(userId, userData) {
    const fields = [];
    const values = [];
    // On récupère les entrée et les valeurs associé de l'objet
    Object.entries(userData).forEach(([key, value], index) => {
      // les deux clefs qui doivent être unique
      if(["email", "username", "newPassword", "refresh_token"].includes(key)) {
        // On mets une clef en paramètre incrémentées par index pour chacune des clefs uniques
        fields.push(`"${key}" = $${index + 1}`);
        // On insère les valeurs correspondantes à sa clef
        values.push(value);
      }
    });
    values.push(userId);

    const query = {
      text :
      `
      UPDATE "user"
        SET
        ${fields.join(",")}
        WHERE "id" = $${values.length}
      `,
      values
    };
    /* Potentiel function en BDD
    text: `SELECT update_user($1, $2)`,
    values: [userId, userData]
    */
    const result = await client.query(query);
    //On transforme en booléen le result pour l'envoi d'un message de confirmation si tout s'est bien passé (ou non)
    return !!result.rowCount;
  },

  /**
   * @param {number} userId L'id utilisateur à supprimer
   * @returns Etat de la suppression
   */
  async delete(userId) {
    const query = `DELETE FROM "user" WHERE id = $1`;
    const result = await client.query(query, [userId]);
    //On transforme en booléen le result pour l'envoi d'un message de confirmation si tout s'est bien passé (ou non)
    return !!result.rowCount;
  },

  /**
    * Vérification si l'utilisateur existe déjà en BDD avec l'email ou le nom d'utilisateur
    * @param {Object} inputUser input envoyés par l'utilisateur
    * @returns Les champs unique en BDD si ils existent
    */
  async isExist(inputUser, userId) {
    const fields = [];
    const values = [];

    // On récupère les entrée et les valeurs associé de l'objet
    Object.entries(inputUser).forEach(([key, value], index) => {
      // les deux clefs qui doivent être unique
      if(["email", "username", "refresh_token"].includes(key)) {
        // On mets une clef en paramètre incrémentées par index pour chacune des clefs uniques
        fields.push(`"${key}" = $${index + 1}`);
        // On insère les valeurs correspondantes à sa clef
        values.push(value);
      }
    });

    const query = {
      text : `SELECT * FROM "user" WHERE (${fields.join(" OR ")})`,
      values
    };

    if (userId) {
      query.text += ` AND id <> $${values.length + 1}`;
      query.values.push(userId);
    }
    const result = await client.query(query);
    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  }
};