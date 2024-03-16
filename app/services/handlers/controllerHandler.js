/**
 * Contrôleur générique pour gérer les erreurs.
 * @param {object} controller controller exécutant try.. catch..
 * @returns Un controller faisant office de middleware
 */
module.exports = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};