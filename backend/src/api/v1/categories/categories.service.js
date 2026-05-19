const Category = require("../../../models/Category");
const AppError = require("../../../utils/AppError");

const createCategory = async (data) => {
  const existing = await Category.findOne({
    name: { $regex: new RegExp(`^${data.name}$`, "i") }, // case-insensitive match
  }).lean();

  if (existing) {
    throw new AppError(409, "Category already exists");
  }

  const category = await Category.create(data);
  return category;
};

const getCategories = async () => {
  const categories = await Category.find().select("-__v").lean();
  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};
