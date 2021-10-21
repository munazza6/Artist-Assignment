const express = require("express");
const path = require("path");
const app = express();
var server = require('http').createServer(app);

app.use(express.static('assets'));

app.get("/", (req, res) => {
res.sendFile("artist.html", { root: "." });
});

// Fire it up!
server.listen(3000);
console.log('Listening on port 3000');