const asynchandler = require("../../../utils/asyncHandler");

const jobService = require("./jobs.service");

const createJob = asynchandler(async (req, res) => {
  const job = await jobService.createJob(req.body);
  res.status(201).json({ message: "Job created successfully", data: job });
});

const getJobs = asynchandler(async (req, res) => {
  const jobs = await jobService.getJobs();
  res.json({ data: jobs });
});

const deleteJob = asynchandler(async (req, res) => {
  const { id } = req.params;
  await jobService.deleteJob(id);
  res.json({ message: "Category deleted successfully" });
});

module.exports = {
  createJob,
  getJobs,
  deleteJob,
};
