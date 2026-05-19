const express = require("express");
const validate = require("../../../middlewares/validate");
const jobController = require("./job.controller");
const { createJobSchema } = require("./job.validation");

const router = express.Router();

router.post("/", validate(createJobSchema), jobController.createJob);

module.exports = router;
