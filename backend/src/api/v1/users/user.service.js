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

const getUsers = async () => {
  const users = await User.find().select("-password -__v").lean();
  return users;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id)
    .select("-password -__v")
    .lean();
  if (!deletedUser) {
    throw new AppError(404, "User not found");
  }

  return deletedUser;
};

const updateUser = async (id, updates) => {
  // Whitelist allowed fields
  const allowedFields = ["username", "email", "password", "role"];
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key)),
  );

  if (Object.keys(filteredUpdates).length === 0) {
    throw new AppError(400, "No valid fields provided for update");
  }

  // Check email conflict only if email is being updated
  if (filteredUpdates.email) {
    const existing = await User.exists({
      email: filteredUpdates.email,
      _id: { $ne: id },
    });
    if (existing) {
      throw new AppError(409, "Email already in use");
    }
  }

  // Hash password only if password is being updated
  if (filteredUpdates.password) {
    filteredUpdates.password = await bcrypt.hash(
      filteredUpdates.password,
      env.SALT_ROUNDS,
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: filteredUpdates }, // Only update provided fields
    { new: true, runValidators: true },
  )
    .select("-password -__v")
    .lean();

  if (!updatedUser) {
    throw new AppError(404, "User not found");
  }

  return updatedUser;
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
};
