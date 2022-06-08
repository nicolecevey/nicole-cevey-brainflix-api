const express = require("express");
const router = express.Router();
const fs = require('fs');

const { v4: uuid} = require("uuid");
const bodyParser = require("body-parser")

const videosFilePath = "./data/videos.json";

router.use(bodyParser.json())

const getVideos = () => {
    return JSON.parse(fs.readFileSync(videosFilePath));
}

router.get('/videos', (req, res) => {
        let videoDetails = getVideos();
        res.send(videoDetails)
});

router.post('/videos', (req, res) => {
    const { title, description } = req.body;
    let videoDetails = getVideos();
    const video = {
        title: title,
        channel: "Oliver's Adventures",
        image: "http://localhost:8085/Upload-video-preview.jpg",
        description: description,
        views: "0",
        likes: "0",
        duration: "10:14",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: [],
        id: uuid()
    }
  
    videoDetails.push(video)
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoDetails))
    res.send(video);
})

router.get('/videos/:id', (req, res) => {  
    const requestedId = req.params.id;
    let videos = getVideos();
    const foundVideo = videos.find(video => video.id === requestedId);

    if (!foundVideo) {
        return res.status(404).send("Video with id " + requestedId + " not found");
    }
    
    return res.send(foundVideo);
});

module.exports = router;