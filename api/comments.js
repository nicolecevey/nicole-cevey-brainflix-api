const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");

require("dotenv").config();
// const { PORT } = process.env;

const videosFilePath = "./data/videos.json";

router.use(bodyParser.json());

const getVideos = () => {
  return JSON.parse(fs.readFileSync(videosFilePath));
};

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
