const router = require("express").Router();
const usersController = require("../../api/controllers/usersController");

router.route("/:id").get(usersController.findByID);

router.route("/").post(usersController.createUser);

router.route("/").put(usersController.updateUser);

module.exports = router;
