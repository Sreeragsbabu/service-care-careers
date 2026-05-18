const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string().valid("admin", "user", "moderator").default("user"),
});

module.exports = {
  createUserSchema,
};
