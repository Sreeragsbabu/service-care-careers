const mongoose = require("mongoose");
const env = require("./env");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGOURI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  logger.info("Disconnected from MongoDB");
};

module.exports = { connectDB, disconnectDB };
