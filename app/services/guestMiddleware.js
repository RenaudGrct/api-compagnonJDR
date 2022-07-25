const guestDatamapper = require("../models/guest");


function genPassword() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
  }
  return password;
}

// Code from : https://dev.to/code_mystery/random-password-generator-using-javascript-6a
module.exports = {
  /**
    * guest controller pour obtenir une entrée.
    * ExpressMiddleware signature
    * @param {object} req Objet de la requête Express
    * @param {object} res Objet de la reponse Express
    * @returns réponse de la Route API JSON
  */

  async createGuestProfile(req, res, next){
    // const password = genPassword();
    // const guest = { email: "vecna1@donjonsql.com", username: "vecna1", password: password};
    req.body.password = genPassword();
    req.body.username = "vecna1";
    req.body.email = "vecna1@donjonsql.com";
    const isGuestExist = await guestDatamapper.isGuestExist();
    if(!isGuestExist){
      await guestDatamapper.insert(req.body);
      next();
    }
    const newVecna = req.body.username.replace("1", isGuestExist.username.slice(5) + 1);
    req.body.username = newVecna;
    req.body.email.replace("vecna1", newVecna);
    await guestDatamapper.insert(req.body);
    next();
  }
};

/*
const array = new Uint32Array(10);
self.crypto.getRandomValues(array);

console.log("Your lucky numbers:");
for (const num of array) {
  console.log(num);
}
*/