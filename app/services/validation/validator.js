const debug = require("debug")("Validator:log");
const { ApiError } = require("../handlers/errorHandler");

/**
 * Générateur de middleware pour la validation
 * d'un objet d'un des propriété de la requête
 * @param {string} property - Nom de la propriété de l'objet request à valider
 * @param {Joi.object} schema - Schema joi
 * @returns
 * Renvoi un middleware pour express qui valide
 * le corps de la requête en utilisant le schema passé en paramètre.
 * Renvoi une erreur 400 si la validation échoue.
 */
module.exports = (property, schema) => async (request, _, next) => {
  try {
    debug(request[property]);
    await schema.validateAsync(request[property]);
    next();
  } catch (error) {
    // Je dois afficher l'erreur à l'utilisateur
    next(new ApiError(`L'information ${error.details[0].message.split(" ", 1).toString().slice(1,-1)} ne rempli pas les conditions de saisie`, { statusCode: 400 }));
  }
};