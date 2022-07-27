const debug = require("debug")("SQL:log");
const { Pool } = require("pg");

const config = {
  connectionString: process.env.DATABASE_URL
};

if (process.env.NODE_ENV === "prod") {
  config.ssl = { rejectUnauthorized :false };
}

const pool = new Pool(config);

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