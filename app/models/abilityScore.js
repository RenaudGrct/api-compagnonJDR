const client = require("../services/database");

module.exports = {
  async insert(abilityScore){
    const fields = [];
    const params = [];
    const values = [];

    // On récupère les entrée et les valeurs associé de l'objet
    Object.entries(abilityScore).forEach(([key, value], index) => {
      fields.push(`"${key}"`);
      params.push(`$${index +1}`);
      values.push(value);
    });

    const query = {
      text:`INSERT INTO cjdr.ability_score
      (${fields.join(", ")})
      VALUES
      (${params.join(", ")})
      RETURNING id`,
      values
    };

    const result = await client.query(query);

    return result.rows[0].id;
  }
};