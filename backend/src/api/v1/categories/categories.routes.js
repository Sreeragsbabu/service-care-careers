const express = require("express");
const validate = require("../../../middlewares/validate");
const categoryController = require("./categories.controller");
const {
  createCategorySchema,
  idParamSchema,
} = require("./categories.validation");
const { route } = require("../users/user.routes");

const router = express.Router();

// create category - admin use only
router.post(
  "/",
  validate(createCategorySchema),
  categoryController.createCategory,
);

// list all categories (including inactive) - admin use only
router.get("/all", categoryController.getCategories);

// list only active categories - public use
router.get("/", categoryController.getActiveCategories);

// delete category - admin use only
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  categoryController.deleteCategory,
);

module.exports = router;
