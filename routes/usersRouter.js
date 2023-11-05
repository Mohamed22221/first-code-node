const express = require("express");
const { getAllusers, regester, login } = require("../controler/usersControler");
const { regesterValidator, loginValidator } = require("../validator/users");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.route("/").get(verifyToken ,getAllusers);
router.route("/regester").post(regesterValidator, regester);
router.route("/login").post(loginValidator, login);

module.exports = router;
