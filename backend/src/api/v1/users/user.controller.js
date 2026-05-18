const asyncHandler = require("../../../utils/asyncHandler");
const userService = require("./user.service");

const createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ message: "User created successfully", data: user });
});

module.exports = {
  createUser,
};
