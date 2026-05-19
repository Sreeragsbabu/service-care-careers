const express = require("express");
const validate = require("../../../middlewares/validate");
const userController = require("./user.controller");
const {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
} = require("./user.validation");

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
  validate(updateUserSchema),
  userController.updateUser,
);

module.exports = router;
