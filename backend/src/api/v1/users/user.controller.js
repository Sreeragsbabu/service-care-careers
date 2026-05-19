const asyncHandler = require("../../../utils/asyncHandler");
const userService = require("./user.service");

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ message: "User created successfully", data: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.json({ data: users });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedUser = await userService.deleteUser(id);
  res
    .status(200)
    .json({ message: "User deleted successfully", user: deletedUser });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.updateUser(id, req.body);
  res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
});

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
};
