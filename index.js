const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const videos = require("./routes/videos");
// const comments = require("./routes/comments");

const { PORT } = process.env;

app.use(cors());

app.use(express.static("./public/images"));

app.get("/", (_req, res) => {
  res.status(200).send("WELCOME");
});

app.use("/", videos);
// app.use("/", comments);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
