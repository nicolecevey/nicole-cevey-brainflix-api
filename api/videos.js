const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");

require("dotenv").config();
const { PORT } = process.env;
const videosFilePath = "./data/videos.json";

router.use(bodyParser.json());

const getVideos = () => {
  return JSON.parse(fs.readFileSync(videosFilePath));
};

router.get("/", (_req, res) => {
  let videoDetails = getVideos();
  const videos = videoDetails.map((video) => {
    const videoDetailsCondensed = {
      title: video.title,
      channel: video.channel,
      image: video.image,
      id: video.id,
    };
    return videoDetailsCondensed;
  });
  res.send(videos);
});

router.post("/", (req, res) => {
  const { title, description, image } = req.body;
  let videoDetails = getVideos();
  const video = {
    title: title,
    channel: "Mohan Muruge",
    image: image,
    description: description,
    views: "0",
    likes: "0",
    duration: "10:14",
    video: `${PORT}/Upload-video-preview.jpg`,
    timestamp: Date.now(),
    comments: [],
    id: uuid(),
  };

  videoDetails.push(video);
  console.log(videoDetails);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails));
  return res.send(video);
});

router.get("/:id", (req, res) => {
  const requestedId = req.params.id;
  let videos = getVideos();
  const foundVideo = videos.find((video) => video.id === requestedId);

  if (!foundVideo) {
    return res.status(404).send("Video with id " + requestedId + " not found");
  }

  return res.send(foundVideo);
});

module.exports = router;
