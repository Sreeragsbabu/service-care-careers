const express = require("express");
const validate = require("../../../middlewares/validate");
const categoryController = require("./categories.controller");
const { createCategorySchema } = require("./categories.validation");
const { route } = require("../users/user.routes");

const router = express.Router();

router.post(
  "/",
  validate(createCategorySchema),
  categoryController.createCategory,
);

router.get("/", categoryController.getCategories);

module.exports = router;
