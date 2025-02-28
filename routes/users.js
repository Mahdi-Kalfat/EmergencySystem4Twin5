var express = require('express');
var router = express.Router();
const UserController = require("../controller/userController");
const authenticateToken = require('../middleware/jwt');

router.post("/addUser", authenticateToken, UserController.adduser);
router.put("/editUser/:id", authenticateToken, UserController.editUser);
router.delete("/deleteUser/:id", authenticateToken, UserController.delUser);
router.get("/display", authenticateToken, UserController.displayUser);
router.post("/login", UserController.login);
router.post("/forgetPassword", UserController.forgetPassword);
router.put('/resetPassword/:token', UserController.resetPassword);
module.exports = router;