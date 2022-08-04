const client = require("../services/database");

module.exports = {
  async insert(characterId, featureChoiceId) {
    const values = [];

    values.push(characterId, featureChoiceId);

    const query = {
      text:`
      INSERT INTO cjdr.feature_choice_chosen (character_id, feature_choice_id)
      VALUES
      ($1, $2)
      `,
      values
    };

    const savedChosenFeatureChoice = await client.query(query);

    return !!savedChosenFeatureChoice.rowCount;
  }
};