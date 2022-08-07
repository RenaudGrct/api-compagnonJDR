// const debug  require("debug")("models:guest");
const client = require("../services/database");

//~~~~ DOC SWAGGER ~~~~
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

/**
  * @typedef {object} GuestLogged
  * @property {number} id - ID de l'utilisateur
  * @property {string} email - Adresse mail de l'utilisateur
  * @property {string} username - Mot de passe de l'utilisateur
  * @property {string} accessToken - AccessToken de l'utilisateur
  * @property {string} refreshToken - RefreshToken de l'utilisateur
*/
//~~~~~~~~~~

module.exports = {

  /**
   * Ajoute un utilisateur invité en BDD
   * @param {InputGuest} guest - l'utilisateur invité à insérer
   * @returns L'utilisateur invité insérer
   */
  async insert(guest, hashPassword) {
    const {email, username} = guest;
    const query = {
      text:`
      INSERT INTO cjdr.guest
      (email, username, password)
      VALUES ($1, $2, $3)`,
      values:[email, username, hashPassword]
    };
    const savedGuest = await client.query(query);
    return savedGuest.rows[0];
  },

  async update(guestId, guestData) {
    const fields = [];
    const values = [];
    Object.entries(guestData).forEach(([key, value], index) => {
      if(["refresh_token"].includes(key)) {
        fields.push(`"${key}" = $${index + 1}`);
        values.push(value);
      }
    });
    values.push(guestId);

    const query = {
      text :
      `
      UPDATE cjdr.guest
        SET
        ${fields.join(",")}
        WHERE "id" = $${values.length}
      `,
      values
    };
    /* Potentiel function en BDD
    text: `SELECT * FROM update_guest($1)`,
    values: [guestId, guestData]
    */
    const result = await client.query(query);
    //On transforme en booléen le result pour l'envoi d'un message de confirmation si tout s'est bien passé (ou non)
    return !!result.rowCount;
  },

  /**
    * Récupère le compte invité selon son id
    * @returns Le compte invité existant en BDD
  */
  async findByPk(guestId) {
    const query = {
      text:`
      SELECT
      id,
      "email",
      "username"
      FROM cjdr.guest
      WHERE id = $1
      `,
      values: [guestId]
    };
    const result = await client.query(query);

    if(result.rowCount === 0) {
      return undefined;
    }
    return result.rows[0];
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
        ORDER BY "id"
        DESC LIMIT 1
      `
    };
    const existingVecna = await client.query(query);
    if (existingVecna.rowCount === 0) {
      return null;
    }
    return existingVecna.rows[0];
  },

  /**
  * On vérifie si l'invité existe en BDD
  * @returns {Object} utilisateur invité trouvé
  */
  async isVecna(inputUser) {
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
      text : `SELECT * FROM cjdr.guest WHERE ${fields.join(" OR ")}`,
      values
    };

    const result = await client.query(query);
    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  }
};