const env = require("./config/env");
const { connectDB } = require("./config/db");
const app = require("./app");
const logger = require("./utils/logger");

const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

start().catch((error) => {
  logger.error("Failed to start server:", error);
  process.exit(1);
});
