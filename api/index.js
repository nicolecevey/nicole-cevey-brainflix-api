const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const videos = require("../routes/videos");
const comments = require("../routes/comments");
const likes = require("../routes/likes");

const { PORT } = process.env;

app.use(cors());

app.use(express.static("../public/images"));

app.get("/api", (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).send("WELCOME");
});

app.get("/", (_req, res) => {
  res.send("Hello, this is the root path!");
});

app.use("/", videos);
app.use("/", comments);
app.use("/", likes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
