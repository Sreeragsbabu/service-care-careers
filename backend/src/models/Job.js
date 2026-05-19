const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Job category is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: [String],
      required: [true, "At least one location is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published", "closed", "expired"],
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    employmentType: {
      type: String,
      enum: {
        values: ["full-time", "part-time", "contract", "remote", "internship"],
        message: "{VALUE} is not a valid employment type",
      },
      required: [true, "Employment type is required"],
    },
    experience: {
      min: {
        type: Number,
        min: [0, "Minimum experience cannot be negative"],
        default: 0,
      },
      max: {
        type: Number,
        min: [0, "Maximum experience cannot be negative"],
      },
    },
    salary: {
      min: {
        type: Number,
        min: [0, "Minimum salary cannot be negative"],
      },
      max: {
        type: Number,
        min: [0, "Maximum salary cannot be negative"],
      },
    },
    skills: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
  },
  { timestamps: true },
);

// Validate salary range
JobSchema.pre("save", async function () {
  if (
    this.salary?.min != null &&
    this.salary?.max != null &&
    this.salary.min > this.salary.max
  ) {
    throw new Error("Minimum salary cannot be greater than maximum salary");
  }

  if (
    this.experience?.min != null &&
    this.experience?.max != null &&
    this.experience.min > this.experience.max
  ) {
    throw new Error(
      "Minimum experience cannot be greater than maximum experience",
    );
  }
});

JobSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
