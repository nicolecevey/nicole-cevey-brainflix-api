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

router.get("/videos", (_req, res) => {
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

router.post("/videos", (req, res) => {
  const { title, description } = req.body;
  let videoDetails = getVideos();
  const video = {
    title: title,
    channel: "Oliver's Adventures",
    image: `${PORT}/Upload-video-preview.jpg`,
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
  fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails));
  res.send(video);
});

router.get("/videos/:id", (req, res) => {
  const requestedId = req.params.id;
  let videos = getVideos();
  const foundVideo = videos.find((video) => video.id === requestedId);

  if (!foundVideo) {
    return res.status(404).send("Video with id " + requestedId + " not found");
  }

  return res.send(foundVideo);
});

router.post("/videos/:id/comments", (req, res) => {
  let videoDetails = getVideos();
  const videoId = req.params.id;
  const newComment = {
    id: uuid(),
    name: req.body.name,
    comment: req.body.comment,
    likes: 0,
    timestamp: Date.now(),
  };
  const selectedVideo = videoDetails.find((video) => video.id === videoId);
  if (selectedVideo) {
    selectedVideo.comments = [newComment, ...selectedVideo.comments];
    res.status(200).send(newComment);
  } else {
    res.status(404).json({ message: "Video not found" });
  }

  fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails));
});

router.delete("/videos/:id/comments/:commentId", (req, res) => {
  const videoId = req.params.id;
  const commentId = req.params.commentId;
  let videoDetails = getVideos();

  const selectedVideo = videoDetails
    .filter((video) => {
      return video.id === videoId;
    })
    .pop();
  const commentIndex = selectedVideo.comments.findIndex((comment) => {
    return comment.id === commentId;
  });

  selectedVideo.comments.splice(commentIndex, 1);
  videoDetails.map((video) => {
    if (video.id === videoId) {
      video = selectedVideo;
    }
    return videoDetails;
  });

  fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails));
  return res.status(200).send(selectedVideo.comments.splice(commentIndex, 1));
});

module.exports = router;
