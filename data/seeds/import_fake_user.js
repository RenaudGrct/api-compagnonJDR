require("dotenv").config();
const client = require("../../app/services/database");
const { hashing } = require("../../app/services/hashPassword");

const data = require("./fake_user.json");

async function importFakeUser(){
  data.forEach(async element => {
    const hash = await hashing(element.password);
    const query = {
      text: "INSERT INTO user(email, username, password) VALUES ($1, $2, $3)",
      values: [`${element.email}`, `${element.username}`, `${hash}`]
    };
    await client.query(query);
  });
}

importFakeUser();