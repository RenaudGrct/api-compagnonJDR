const bcrypt = require("bcrypt");
const userDatamapper = require("../models/user.js");


module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Si le mot de passe doit suivre des recommandations, on les vérifie aussi
      // Si le mot de passe doit contenir des caracteres speciaux
      // Si il doit avoir une longueur minimale

      if (!emailValidator.validate(email)) {
        res.json({ error: 'Le courriel est invalide' });
      }

      // on va vérifier si user avec email existe
      const user = await userDatamapper.findByPk({
        where: { email: email },
      });

      let ok = false;
      if (user) {
        // verif mot de passe
        ok = await bcrypt.compare(password, user.password);
      }

      if (ok) {
        delete user.dataValues.password;

        // Si tout va bien on fait une session
        req.session.user = user;

        return res.redirect("/");
      }

      res.json({ error: 'Something went wrong' });
    } catch (error) {
      console.error(error);
    }
  }
};