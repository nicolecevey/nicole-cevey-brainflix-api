Three endpoints:
    - GET /videos
        - array of videos
    - GET /videos/:id
        - responds with an object containing the details of the video with an id :id
    - POST /videos
        - add a new video to the video list. A unique id must be generated for each video added

Video Upload Page
 -- event handler for upload form so when a user submits a new video, it posts the video to your API in order to save it to the list of videos
 -- needs to be persisted in JSON file
 -- default image is bike image