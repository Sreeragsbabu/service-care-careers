const express = require("express");
const router = express.Router();
const User = require("../models/User");

//create user
router.post("/", require("./users/createUser"));

module.exports = router;
