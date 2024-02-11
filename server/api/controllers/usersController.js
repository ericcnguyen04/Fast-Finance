const db = require("../../models");
const { Nessie, Customer } = require("../nessie");

module.exports = {
    findByID: (req, res) => {
        db.Users.findOne({ auth0_uid: req.params.id })
            .then((dbUser) => res.json(dbUser))
            .catch((err) => res.status(500).json(err));
    },
    createUser: async (req, res) => {
        try {
            const dbUser = await db.Users.findOne({
                auth0_uid: req.body.auth0_uid,
            });

            if (dbUser) {
                return res.status(201).json(dbUser);
            }

            let nessie = new Nessie(process.env.NESSIE_KEY);

            const user = new db.Users({ auth0_uid: req.body.auth0_uid });
            await user.save();
            return res.status(201).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    updateUser: async (req, res) => {
        try {
            let user = await db.Users.findOne({
                auth0_uid: req.body.auth0_uid,
            });
            if (!user.nessie_id) {
                let nessie = new Nessie(process.env.NESSIE_KEY);

                let customer = new Customer(
                    req.body.first_name,
                    req.body.last_name,
                    req.body.street_number,
                    req.body.street_name,
                    req.body.city,
                    req.body.state,
                    req.body.zip
                );

                let newCustomer = await nessie.create_customer(customer);

                user = await db.Users.findOneAndUpdate(
                    { auth0_uid: req.body.auth0_uid },
                    {
                        nessie_id: newCustomer["objectCreated"]["_id"],
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                    }
                );
            }

            user = await db.Users.findOne({ auth0_uid: req.body.auth0_uid });
            return res.status(202).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};
