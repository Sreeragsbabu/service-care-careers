const asyncHandler = require("../../../utils/asyncHandler");
const categoryService = require("./categories.service");

const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res
    .status(201)
    .json({ message: "Category created successfully", data: category });
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.json(categories);
});

module.exports = {
  createCategory,
  getCategories,
};
