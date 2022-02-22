const express = require("express");
const { checkUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", checkUser);

module.exports = router;
