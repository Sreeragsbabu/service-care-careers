const mongoose = require("mongoose");
const { Schema } = mongoose;

const USER_ROLES = ["admin", "hr", "user"];

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", UserSchema);
User.ROLES = USER_ROLES;

module.exports = User;
