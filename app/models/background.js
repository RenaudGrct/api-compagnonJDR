// const debug = require("debug")("models:backgrounds");
const client = require("../services/database");

module.exports = {
  /**
    * Récupère toutes les données des historiques
    * @returns {object} - Toutes les informations de tous les hitorique en BDD.
  */
  async findAll(){

    const query = {
      text: "SELECT * FROM background_list",
    };

    const result = await client.query(query);

    if (!result.rowCount === 0 ) {
      return null;
    }

    return result.rows;
  }
};