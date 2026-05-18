const express = require("express");
const userRoutes = require("./users/user.routes");

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/jobs", require("./jobs/job.routes"));
// router.use("/applications", require("./applications/application.routes"));
// router.use("/categories", require("./categories/category.routes"));

module.exports = router;
