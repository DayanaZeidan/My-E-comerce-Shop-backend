const express = require("express");
const {validateCreateUser} = require("../validators/Users")
//router is built-in inside express
const router = express.Router();
const controller = require("../controllers/Users");

router.get("/get",  controller.get);
router.post("/register", validateCreateUser, controller.register);
router.post("/login", controller.login);
router.post("/getuser", controller.getUser);

module.exports = router;
