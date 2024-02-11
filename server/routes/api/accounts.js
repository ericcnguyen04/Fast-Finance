const router = require("express").Router();
const accountsController = require("../../api/controllers/accountsController");

router.route("/:nessie_id").get(accountsController.accounts);

router.route("/spend/:account_id").get(accountsController.totalSpend);

module.exports = router;
