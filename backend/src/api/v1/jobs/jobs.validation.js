const Joi = require("joi");
const objectId = Joi.string().hex().length(24).required();

const createJobSchema = Joi.object({
  title: Joi.string().min(3).max(255).trim().required(),
  category: objectId,
  description: Joi.string().min(10).max(5000).trim().optional(),
  location: Joi.array().items(Joi.string()).min(1).required(),
  status: Joi.string()
    .valid("draft", "published", "closed", "expired")
    .default("draft"),
  employmentType: Joi.string()
    .valid("full-time", "part-time", "contract", "remote", "internship")
    .required(),
  experience: Joi.object({
    min: Joi.number().min(0).default(0),
    max: Joi.number().min(0),
  }).optional(),
  salary: Joi.object({
    min: Joi.number().min(0),
    max: Joi.number().min(0),
  }).optional(),
  skills: Joi.array().items(Joi.string()).min(1).required(),
  responsibilities: Joi.array().items(Joi.string()).min(1).required(),
  createdBy: objectId,
});

const idParamSchema = Joi.object({
  id: objectId,
});

module.exports = {
  createJobSchema,
  idParamSchema,
};
