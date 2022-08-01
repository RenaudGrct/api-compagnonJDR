const ApiError = require("../errors/apiError");

module.exports = {
  unvailableFields (user, body){
    const fields = [];
    if (user.username === body.username) {
      fields.push("ce nom d'utilisateur");
    }
    if (user.email === body.email) {
      fields.push("cette adresse mail");
    }
    throw new ApiError (`Un profile existe déjà avec ${fields.join(" et ")}`, { statusCode : 404 });
  }
};