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
  const visitor_name = req.query.visitor_name;
  const ClientIp = req.headers["x-forwarded-for"] || "41.203.78.171";

  
  
  try {
      const geo = await geoip.lookup(ClientIp);
      const location = geo.city
   
    const weatherRes = await axios.get(
      `https://api.tomorrow.io/v4/weather/realtime?location=Lagos&apikey=${apiKey}`
    );
    const temperature = weatherRes.data.data.values.temperature || 11;
    // const temperature = 11;

    res.json({
      client_ip: ClientIp,
      location: `${location}`,
      greeting: `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celsius in ${location}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server errors!");
  }
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
