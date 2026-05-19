require("dotenv").config();

const required = ["MONGOURI"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  // Fail fast at boot rather than discovering this at the first request.
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,
  MONGOURI: process.env.MONGOURI,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET || "change-me-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
};

env.isProduction = env.NODE_ENV === "production";
env.isDevelopment = env.NODE_ENV === "development";
env.isTest = env.NODE_ENV === "test";

module.exports = env;
