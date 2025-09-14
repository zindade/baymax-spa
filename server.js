// CommonJS
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());


app.use(express.static(path.join(process.cwd(), "frontend")));

const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};

https.createServer(options, app).listen(5500, () => {
  console.log("HTTPS server running at https://localhost:5500");
});
