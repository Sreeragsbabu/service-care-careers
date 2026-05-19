const AppError = require("../utils/AppError");
const logger = require("../utils/logger");
const env = require("../config/env");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  // Known operational error thrown by our code.
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details ? { errors: err.details } : {}),
    });
  }

  // Mongoose duplicate key.
  if (err && err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `Duplicate value for ${field}` });
  }

  // Mongoose validation errors.
  if (err && err.name === "ValidationError") {
    const details = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(422).json({ message: "Validation failed", errors: details });
  }

  // Mongoose cast errors (e.g. bad ObjectId).
  if (err && err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  logger.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal server error",
    ...(env.isProduction ? {} : { error: err.message, stack: err.stack }),
  });
};

module.exports = errorHandler;
