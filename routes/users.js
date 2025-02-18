var express = require('express');
var router = express.Router();
const UserController = require("../controller/userController");

router.post("/addUser", UserController.adduser);
router.put("/editUser/:id", UserController.editUser);
router.delete("/deleteUser/:id", UserController.delUser);
router.get("/display", UserController.displayUser);
router.post("/login", UserController.login);
router.post("/forgetPassword", UserController.forgetPassword);

module.exports = router;
