const {
    User
} = require("../datamappers/user.js");

const userController = {

    async findUser(req, res) {
        try{
            const user = await User.findByPk();
            res.json(user);
        } catch(error) {
            res.status(error.response.status).send("Une erreur est survenue");
            console.log(error.response.status);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.insert(req.body);
            res.send(user);
        } catch (error) {
            res.status(error.response.status).send("Une erreur est survenue");
            console.log(error.response.status);
        }

    },

    async updateUser(req, res) {
        try {

            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json("Modification impossible");
            }
            await User.update(userId, req.body);
            return res.status(200).json("Modification réussie");
        } catch(error) {
            res.status(error.response.status).send("Une erreur est survenue");
            console.log(error.response.status);
        }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await User.delete(userId);
            return res.status(200).json("L'utilisateur a été supprimé");
        } catch (error) {
            res.status(error.response.status).send("Une erreur est survenue");
            console.log(error.response.status);
        }
    }

};

module.exports = userController;