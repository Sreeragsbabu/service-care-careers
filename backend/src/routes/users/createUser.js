const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { createUserSchema } = require("../../validation/user");

const SALT_ROUNDS = 10;

const createUser = async (req, res) => {
  // Validate request body
  const { error, value } = createUserSchema.validate(req.body, {
    abortEarly: false, // Collect all errors at once
    stripUnknown: true, // Remove unknown fields
  });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(422).json({ message: "Validation failed", errors });
  }

  const { username, password, email, role } = value;

  try {
    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, password: hashedPassword, email, role });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("createUser error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createUser;
