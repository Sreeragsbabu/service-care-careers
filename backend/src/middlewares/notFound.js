const AppError = require("../utils/AppError");

const notFound = (req, _res, next) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = notFound;
