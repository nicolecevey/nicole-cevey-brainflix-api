const express = require("express");
const cors = require("cors");

const videos = require("./routes/videos");
const app = express();

require("dotenv").config();
const { PORT, BACKEND_URL } = process.env;

app.use(cors());
app.use(express.static("./public/images"));

app.get("/", (_req, res) => {
  res.status(200).send("WELCOME");
});

app.use("/", videos);

app.listen(PORT, () => {
  console.log(`Server listening on ${BACKEND_URL}: ${PORT}`);
});
