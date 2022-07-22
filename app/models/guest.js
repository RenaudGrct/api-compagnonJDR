const guestClient = require("../services/database");


module.exports = {
  async insert(guest) {
    const {email, username, password} = guest;
    const query = {
      text:`
      INSERT INTO cjdr.guest
      (email, username, password)
      VALUES ($1, $2, $3)`,
      values:[email, username, password]
    };
    const savedGuest = await guestClient.query(query);
    return savedGuest.rows[0];
  },

};