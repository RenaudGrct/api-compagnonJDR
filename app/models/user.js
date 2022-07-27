const debug = require("debug")("models:user");
const client = require("../services/database");
/**
  * @typedef {object} User
  * @property {number} id - Identifiant unique (PK)
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
*/

/**
  * @typedef {object} InputUser
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
  * @property {string} newPassword - Nouveau mot de passe de l'utilisateur
*/

/**
  * @typedef {object} LoginUser
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
*/

/**
  * @typedef {object} UserLogged
  * @property {number} id - ID de l'utilisateur
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Mot de passe de l'utilisateur
  * @property {string} accessToken - AccessToken de l'utilisateur
*/

/**
  * @typedef {object} InputUserRegister
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
*/


module.exports = {
  /**
    * Récupère l'utilisateur selon son id
    * @returns L'utilisateur existant en BDD
  */

  async findByPk(userId) {
    const query = {
      text:`
      SELECT * FROM cjdr.user
      WHERE id = $1
      `,
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
  async insert(guest) {
    const {email, username, password} = guest;
    const query = {
      text:`
      INSERT INTO cjdr.user 
      (email, username, password) 
      VALUES ($1, $2, $3)`,
      values:[email, username, password]
    };
    const savedUser = await client.query(query);
    //On transforme en booléen le result pour l'envoi d'un message de confirmation si tout s'est bien passé (ou non)
    return !!savedUser.rowCount;
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
      UPDATE cjdr.user
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
    const query = "DELETE FROM cjdr.user WHERE id = $1";
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
      text : `SELECT * FROM cjdr.user WHERE (${fields.join(" OR ")})`,
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