const { User } = require("../datamappers/user.js");

const userController = {
  async createUser(req,res) {
     
  },

  async modifyUser(req,res) {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
  },

  async deleteUser(req,res) {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
    }
    res.status(204).end();
  }

};

module.exports = userController;