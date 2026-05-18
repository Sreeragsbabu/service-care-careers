const bcrypt = require("bcryptjs");
const User = require("../../../models/User");
const AppError = require("../../../utils/AppError");
const env = require("../../../config/env");

const createUser = async ({ username, email, password, role }) => {
  const existing = await User.exists({ email });
  if (existing) {
    throw new AppError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  return user.toJSON();
};

module.exports = {
  createUser,
};
