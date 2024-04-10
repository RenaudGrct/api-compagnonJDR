const client = require("../services/database");

module.exports = {
  async insert(characterId, skillsId) {
    const values = [];
    const fields = [];

    values.push(parseInt(characterId));
    skillsId.forEach((skillId, index) => {
      if (skillId) {
        fields.push(`($1, $${index + 2})`);
        values.push(`${parseInt(skillId)}`);
      }
    });

    const query = {
      text:`
      INSERT INTO skill_chosen (character_id, skill_id)
      VALUES
      ${fields.join(",")}
      `,
      values
    };

    const savedChosenSkills = await client.query(query);

    return !!savedChosenSkills.rowCount;
  }
};