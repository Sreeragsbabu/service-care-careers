const Joi = require("joi");

const createJobSchema = Joi.object({
  title: Joi.string().min(3).max(255).trim().required(),
  description: Joi.string().min(3).max(255).trim().required(),
  company: Joi.string().min(3).max(255).trim().required(),
  location: Joi.string().min(3).max(255).trim().required(),
  type: Joi.string().min(3).max(255).trim().required(),
  salary: Joi.string().min(3).max(255).trim().required(),
  experience: Joi.string().min(3).max(255).trim().required(),
  category: Joi.string().min(3).max(255).trim().required(),
  status: Joi.string().min(3).max(255).trim().required(),
});

module.exports = {
  createJobSchema,
};
