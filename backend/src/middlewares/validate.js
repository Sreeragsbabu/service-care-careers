const AppError = require("../utils/AppError");

// Generic Joi validator. Usage: router.post("/", validate(schema), controller).
// By default it validates req.body; pass `property` to validate query/params.
const validate = (schema, property = "body") => (req, _res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((d) => d.message);
    return next(new AppError(422, "Validation failed", details));
  }

  req[property] = value;
  next();
};

module.exports = validate;
