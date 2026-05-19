const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50).trim().required(),
  description: Joi.string().max(255).trim().optional(),
  status: Joi.string().valid("active", "inactive").default("active").optional(),
});

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  createCategorySchema,
  idParamSchema,
};
