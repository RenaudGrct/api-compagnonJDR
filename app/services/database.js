const debug = require("debug")("SQL:log");
const { Pool } = require("pg");

const pool = new Pool();

// const pg = require("pg");

// const client = new pg.Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
// client.connect();

module.exports = {
  originalClient: pool,

  async query(...params){
    debug(...params);
    return this.originalClient.query(...params);
  }
};