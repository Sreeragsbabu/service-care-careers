const express = require("express");
const validate = require("../../../middlewares/validate");
const userController = require("./user.controller");
const { createUserSchema } = require("./user.validation");

const router = express.Router();

router.post("/", validate(createUserSchema), userController.createUser);

module.exports = router;
