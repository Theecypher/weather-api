const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 2200;
const apiKey = process.env.API_KEY
const axios = require("axios")

// const do = () => {}

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const client = req.query['x-foward-for'] || req.connection.remoteAddress;


    try {
        const locationRes = await axios.get(`http://ip-api.com/json/${client}`)
        const location = locationRes.data.city || "Unknown location"

        const weatherRes = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&${apiKey}`)
        const temperature = weatherRes.data.current.temperature

        res.json({
            client,
            location: `${location}`,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
        })
    }

    catch (error) {
        res.status(500).send("Internal server error!")
    }
})




app.listen(port, () => {
    console.log(`app is listening on http://localhost${port}`);
  });
  