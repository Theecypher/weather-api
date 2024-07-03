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

app.get("/api/hello", async (req, res) => {
  try {
    res.json({
        name: "Mma",
        status: "O ti su mi"
    });
  } catch (error) { 
    console.log(error);
    res.status(500).send("Internal server error!")
  }
});

// const server = http.createServer(app);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
