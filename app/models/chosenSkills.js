const client = require("../services/database");

module.exports = {
  async insert(characterId, skillsId) {
    const values = [];

    values.push(characterId);

    skillsId.forEach(skillId => {
      values.push(`${skillId}`);
    });

    const query = {
      text:`
      INSERT INTO cjdr.skill_chosen (character_id, skill_id)
      VALUES
      ($1, $2),
      ($1, $3)
      `,
      values
    };

    const savedChosenSkills = await client.query(query);

    return !!savedChosenSkills.rowCount;
  }
};