const debug = require("debug")("Validator:log");
const { ApiError } = require("../services/errorHandler");

/**
 * Générateur de middleware pour la validation
 * d'un objet d'un des propriété de la requête
 * @param {string} prop - Nom de la propriété de l'objet request à valider
 * @param {Joi.object} schema - Schema joi
 * @returns
 * Renvoi un middleware pour express qui valide
 * le corp de la requête en utilisant le schema passé en paramètre.
 * Renvoi une erreur 400 si la validation échoue.
 */
module.exports = (body, schema) => async (request, _, next) => {
  try {
    debug(request[body]);
    await schema.validateAsync(request[body]);
    next();
  } catch (error) {
    // Je dois afficher l'erreur à l'utilisateur
    next(new ApiError(error.details[0].message, { statusCode: 400 }));
  }
};