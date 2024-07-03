const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 2200;
const apiKey = process.env.API_KEY;
const axios = require("axios");
const http = require("http");
const geoip = require("fast-geoip");

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("This is the free weather api!.");
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});