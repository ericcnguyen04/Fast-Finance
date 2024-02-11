const db = require("../../models");
const { Nessie, Customer } = require("../nessie");

module.exports = {
    totalSpend: async (req, res) => {
        try {
            let nessie = new Nessie(process.env.NESSIE_KEY);
            let account_id = req.params.account_id;

            let total_spend = await nessie.total_spend(account_id);

            return res.json({ total_spend: total_spend });
        } catch (e) {
            console.log(e);
        }
    },
    accounts: async (req, res) => {
        try {
            let nessie = new Nessie(process.env.NESSIE_KEY);
            let nessie_id = req.params.nessie_id;

            let accounts = await nessie.get_customer_accounts(nessie_id);

            return res.json(accounts);
        } catch (e) {
            console.log(e);
        }
    },
};
