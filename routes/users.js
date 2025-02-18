var express = require('express');
var router = express.Router();
const UserController = require("../controller/userController");

router.post("/addUser", UserController.adduser);
router.put("/editUser/:id", UserController.editUser);
router.delete("/deleteUser/:id", UserController.delUser);
router.get("/display", UserController.displayUser);

module.exports = router;
