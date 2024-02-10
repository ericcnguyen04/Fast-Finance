const db = require("../models");

module.exports = {
    findByID: (req, res) => {
        db.Users.findOne({ auth0_uid: req.params.id })
            .then((dbUser) => res.json(dbUser))
            .catch((err) => res.status(500).json(err));
    },
    createUser: async (req, res) => {
        try {
            const user = new db.Users({ auth0_uid: req.body.auth0_uid });
            await user.save();
            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            let user = await db.Users.findOneAndUpdate(
                { auth0_uid: req.body.auth0_uid },
                req.body
            );
            user = await db.Users.findOne({ auth0_uid: req.body.auth0_uid });
            return res.status(202).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};
