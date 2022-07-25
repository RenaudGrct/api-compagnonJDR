const client = require("../services/database");
/**
  * @typedef {object} Guest
  * @property {number} id - Identifiant unique (PK)
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
*/
/**
  * @typedef {object} InputGuest
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Pseudo de l'utilisateur
  * @property {string} password - Mot de passe de l'utilisateur
*/
module.exports = {

  /**
   * Ajoute un utilisateur invité en BDD
   * @param {InputGuest} guest - l'utilisateur invité à insérer
   * @returns L'utilisateur invité insérer
   */
  async insert(guest) {
    const {email, username, password} = guest;
    const query = {
      text:`
      INSERT INTO cjdr.guest
      (email, username, password)
      VALUES ($1, $2, $3)`,
      values:[email, username, password]
    };
    const savedGuest = await client.query(query);
    return savedGuest.rows[0];
  },

  /**
  * On récupère le dernier invité insérer en BDD
  * @returns {Object} Dernier invité insérer en BDD
  */
  async isGuestExist() {
    const query = {
      text: `
      SELECT * FROM cjdr.guest
        WHERE "username"
        LIKE 'vecna%'
        ORDER BY "username"
        DSC LIMIT 1
      `
    };
    const existingVecna = await client.query(query);
    if (existingVecna.rowCount === 0) {
      return null;
    }
    return existingVecna.rows[0];
  }
};