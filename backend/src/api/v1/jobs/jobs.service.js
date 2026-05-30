const Job = require("../../../models/Job");
const AppError = require("../../../utils/AppError");

const createJob = async (jobData) => {
  const existing = await Job.findOne({
    title: { $regex: new RegExp(`^${jobData.title}$`, "i") },
    createdBy: jobData.createdBy,
    employmentType: jobData.employmentType,
  }).lean();

  if (existing) {
    throw new AppError(
      409,
      "A job with the same title and employment type already exists",
    );
  }

  const job = new Job(jobData);
  await job.save();
  return job;
};

const getJobs = async () => {
  const jobs = await Job.find()
    .populate("createdBy", "username email")
    .populate("category", "name")
    .lean();
  return jobs;
};

const deleteJob = async (id) => {
  const deletedJob = await Job.findByIdAndDelete(id).lean();
  if (!deletedJob) {
    throw new AppError(404, "Job not found");
  }
  return deletedJob;
};

module.exports = {
  createJob,
  getJobs,
  deleteJob,
};
