const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const videos = require("./videos");
const comments = require("./comments");
const likes = require("./likes");

const { PORT } = process.env;

app.use(cors());

app.use(express.static("../public/images"));

app.get("/", (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).send("WELCOME");
});

app.use("/videos", videos);
app.use("/comments", comments);
app.use("/likes", likes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
