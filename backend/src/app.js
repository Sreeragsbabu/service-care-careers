const express = require("express");
const cors = require("cors");

const apiV1 = require("./api/v1");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/v1", apiV1);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
