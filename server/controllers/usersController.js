const db = require("../models");

module.exports = {
    findByID: (req, res) => {
        db.Users.findOne({ auth0_uid: req.params.id })
            .then((dbUser) => res.json(dbUser))
            .catch((err) => res.status(500).json(err));
    },
    createUser: async (req, res) => {},
};
