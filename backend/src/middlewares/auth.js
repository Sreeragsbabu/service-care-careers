const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const env = require("../config/env");

// Verifies a Bearer JWT and attaches the decoded payload to req.user.
const authenticate = (req, _res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError(401, "Missing or malformed Authorization header"));
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
};

// Role guard. Use after `authenticate`. Example: authorize("admin", "hr").
const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!req.user) {
    return next(new AppError(401, "Not authenticated"));
  }
  if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
    return next(new AppError(403, "Insufficient permissions"));
  }
  next();
};

module.exports = { authenticate, authorize };
