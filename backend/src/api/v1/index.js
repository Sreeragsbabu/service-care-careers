const express = require("express");
const userRoutes = require("./users/user.routes");
const categoryRoutes = require("./categories/categories.routes");
const jobRoutes = require("./jobs/jobs.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/jobs", jobRoutes);

module.exports = router;
