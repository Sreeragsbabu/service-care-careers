const express = require("express");
const validate = require("../../../middlewares/validate");
const jobController = require("./jobs.controller");
const { createJobSchema, idParamSchema } = require("./jobs.validation");

const router = express.Router();

router.post("/", validate(createJobSchema), jobController.createJob);

router.get("/", jobController.getJobs);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  jobController.deleteJob,
);

module.exports = router;
