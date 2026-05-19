const Joi = require("joi");
const { ROLES } = require("../../../models/User");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string()
    .valid(...ROLES)
    .default("user"),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim(),
  email: Joi.string().email().lowercase().trim(),
  password: Joi.string().min(8).max(128),
  role: Joi.string().valid(...ROLES),
}).or("username", "email", "password", "role");

const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
};
