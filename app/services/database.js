const debug = require("debug")("SQL:log");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  originalClient: pool,

  async end(...params){
    debug(...params);
    return this.originalClient.end(...params);
  },

  async connect(...params){
    debug(...params);
    return this.originalClient.connect(...params);
  },

  async query(...params){
    debug(...params);
    return this.originalClient.query(...params);
  }
};