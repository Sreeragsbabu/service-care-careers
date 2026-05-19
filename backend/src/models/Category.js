const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },
  },
  { timestamps: true },
);

CategorySchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
