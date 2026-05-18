require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const MongoURI = process.env.MONGOURI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user");
// const jobRoutes = require("./routes/jobs");
// const applicationRoutes = require("./routes/applications");
// const categoryRoutes = require("./routes/categories");

//routes
app.use("/api/user", userRoutes);
// app.use("/api/job", jobRoutes);
// app.use("/api/application", applicationRoutes);
// app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
