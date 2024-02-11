const router = require("express").Router();
const userRoutes = require("./users");
const accountRoutes = require("./accounts");

router.use("/users", userRoutes);
router.use("/accounts", accountRoutes);

module.exports = router;
