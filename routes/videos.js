const express = require("express");
const router = express.Router();
const fs = require('fs');

const videosFilePath = "./data/videos.json";
const getVideos = () => {
    return JSON.parse(fs.readFileSync(videosFilePath));
}

router.get('/videos', (req, res) => {
    let videoDetails = getVideos();
    res.send(videoDetails)
});

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