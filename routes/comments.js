// const router = require("express").Router();
// const data = require("../data/videos.json");

// const updateData = (object) => {
//   return new Promise((res, rej) => {
//     const stringData = JSON.stringify(object, null, 2);
//     res(stringData);
//   });
// };

// router.post("/videos/:videoId/comments", (req, res) => {
//   let id = req.params.id;
//   let selectedVideo = data.find((video) => video.id === id);
//   const name = req.body.name;
//   const comment = req.body.comment;
//   let newComment = {
//     name: name,
//     comment: comment,
//     id: uuid.v4(),
//     likes: 0,
//     timestamp: Date.now(),
//   };

//   selectedVideo.comments.push(newComment);

//   updateData(data).then((result) => {
//     fs.writeFile("../data/videos.json", result, (err) => {
//       console.log("File write success!");
//       if (err) {
//         res.status(403).json("Error, not found");
//       } else {
//         res.status(201).json("Success, comment posted");
//       }
//     });
//   });
// });

// // // DELETE /videos/:videoId/comments/:commentid
// // router.delete('/videos/:videoId/comments/:commentId', (req, res) => {
// //     const videoId = req.params.videoId;
// //     const commentId = req.params.commentId;
// //     const video = videosFilePath.videoDetails.filter(video => {
// //         return video.id === videoId
// //     }).pop();
// //     const commentIndex = video.comments.findIndex(comment => {
// //         comment.id === commentId
// //     });
// //     video.comments.splice(commentIndex, 1);
// //     return res.status(200).send(video.comments.splice(commentIndex, 1));
// // })

// module.exports = router;
