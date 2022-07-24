const debug = require("debug")("app:models");
const client = require("../services/database");
/**
  * @typedef {object} User
  * @property {number} id - Identifiant unique (PK)
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {boolean} isguest - Défini si le compte est généré automatiquement
*/

/**
  * @typedef {object} InputUser
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
*/

/**
  * @typedef {object} LoginUser
  * @property {string} email - Adresse mail de l'utilisateur
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
  async insert(user) {
    const {email, username, password} = user;
    const query = {
      text:`
      INSERT INTO cjdr.user 
      (email, username, password) 
      VALUES ($1, $2, $3)`,
      values:[email, username, password]
    };
    const savedUser = await client.query(query);
    return savedUser.rows[0];
  },

  /**
   * @param {number} userId PK de l'utilisateur
   * @param {Object} userData input de l'utilisateur à update en BDD
   * @returns Etat de l'update
   */
  async update(userId, userData) {
    const { email, username, password} = userData;
    const isGuest = false;
    const query = {
      text: `
        UPDATE cjdr.user
          SET
          "email" = $1,
          "username" = $2,
          "password" = $3,
          "isguest" = $4
        WHERE "id" = $5
        `,
      values: [email, username, password, isGuest, userId]

      /* Potentiel function en BDD
      text: `SELECT update_user($1, $2)`,
      values: [userId, userData]
      */
    };
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
      if(["email", "username"].includes(key)) {
        // On mets une clef en paramètre incrémentées par index pour chacune des clefs uniques
        fields.push(`"${key}" = $${index + 1}`);
        // On insère les valeurs correspondantes à sa clef
        values.push(value.toLowerCase());
      }
    });
    const query = {
      text : `SELECT * FROM cjdr.user WHERE ${fields.join(" OR ")}`,
      values
    };

    if (fields.length === 1) {
      query.text = `SELECT * FROM cjdr.user WHERE ${fields}`;
    }

    // if (userId) {
    //   query.text += ` AND id = $${values.length + 1}`;
    //   query.values.push(userId);
    // }
    debug("query : ", query)

    const result = await client.query(query);
    debug("query result", result.rowCount[0]);
    if (result.rowCount === 0) {
      return null;
    }

    return result.rowCount[0];
  }
};