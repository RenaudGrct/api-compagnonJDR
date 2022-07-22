/**
 * Implémentation de nos propre message d'erreur
 * Extension de la class Error
 * Cela permet de passer plusieurs info comme le status HTTP
 * Elles peuvent être exploitées.
 * @typedef {object} ApiError
 * @property {string} message - Message d'erreur
 * @property {string} name - Nom de l'erreur
 * @property {object} infos - informations supplémentaires
 */

module.exports = class ApiError extends Error {
  constructor(message, infos) {
    super(message);
    // On change le nom de base ("error") par le notre
    this.name = "ApiError";
    // On transmets les infos supplémentaires liées à l'erreur
    this.infos = infos;
  }
};