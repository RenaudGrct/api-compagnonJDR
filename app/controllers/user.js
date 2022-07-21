const {
    User
} = require("../datamappers/user.js");

const userController = {

    async findUser(req, res) {
        const user = await User.findByPk();
        res.json(user);

    },

    async createUser(req, res) {
        const user = await User.insert(req.body);
        res.send(user);

    },

    async updateUser(req, res) {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (! user) {
            return res.status(404).json("Modification impossible");
        }
        await User.update(userId, req.body);
        return res.status(200).json("Modification réussie");
    },

    async deleteUser(req, res) {
        const userId = req.params.id;
        await User.delete(userId);
        return res.status(200).json("L'utilisateur a été supprimé");

    }

};

module.exports = userController;