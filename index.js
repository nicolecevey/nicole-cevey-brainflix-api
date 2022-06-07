const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
    res
        .status(200)
        .send("Welcome to homepage")
});

app.listen(8080, () => {
    console.log("Server listening on http://localhost: 8080")
});