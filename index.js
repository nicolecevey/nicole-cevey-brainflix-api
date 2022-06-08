const express = require("express");
const cors = require("cors");

const videos = require("./routes/videos");
const app = express();

app.use(cors());

app.use(express.static("./public/images"));

app
	.get("/", (req, res) => {
	res
		.status(200)
		.send("WELCOME");
})

app.use('/', videos);

app.listen(8085, () => {
    console.log("Server listening on http://localhost: 8085")
});