const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const userRoutes = require("./routes/user-routes");
const uploadRoutes = require("./routes/upload-routes");

const app = new express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  next();
});

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.static(`${__dirname}/uploads`));
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);

module.exports = app;
