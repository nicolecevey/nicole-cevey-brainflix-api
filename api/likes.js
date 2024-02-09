const express = require("express");
const router = express.Router();
const fs = require("fs");
const videosFilePath = "./data/videos.json";

const getVideos = () => {
  return JSON.parse(fs.readFileSync(videosFilePath));
};

router.put("/videos/:id/likes", (req, res) => {
  let videoDetails = getVideos();
  const videoId = req.params.id;
  const video = videoDetails.filter((video) => {
    return video.id === videoId;
  });

  videoDetails.map((video) => {
    if (video.id === videoId) {
      let likes = video.likes.replace(",", "");
      let intLikes = parseInt(likes);
      intLikes++;
      video.likes = intLikes.toLocaleString();
    }
    return videoDetails;
  });

  fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails));
  return res.status(201).send(video.pop());
});

module.exports = router;
