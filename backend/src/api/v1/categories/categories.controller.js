const asyncHandler = require("../../../utils/asyncHandler");
const categoryService = require("./categories.service");

// Admin use only - creates a new category
const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res
    .status(201)
    .json({ message: "Category created successfully", data: category });
});

// Admin use only - lists all categories including inactive ones
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.json(categories);
});

// Public use - lists only active categories
const getActiveCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getActiveCategories();
  res.json(categories);
});

// Admin use only - deletes a category by ID
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await categoryService.deleteCategory(id);
  res.json({ message: "Category deleted successfully" });
});

module.exports = {
  createCategory,
  getCategories,
  getActiveCategories,
  deleteCategory,
};
