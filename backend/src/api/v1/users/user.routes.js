const express = require("express");
const validate = require("../../../middlewares/validate");
const userController = require("./user.controller");
const { createUserSchema, idParamSchema } = require("./user.validation");
const { deleteUser } = require("./user.service");

const router = express.Router();

router.post("/", validate(createUserSchema), userController.createUser);

router.get("/", userController.getUsers);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  userController.deleteUser,
);

router.patch(
  "/:id",
  validate(idParamSchema, "params"),
  userController.updateUser,
);

module.exports = router;
