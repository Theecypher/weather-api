const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name || 'Guest';
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // Get location info based on IP address
    const locationResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const location = locationResponse.data.city || 'Unknown location';
    const region = locationResponse.data.regionName || 'Unknown region';

    // Get weather info
    const weatherResponse = await axios.get(`http://api.weatherstack.com/current?access_key=YOUR_API_KEY&query=${location}`);
    const temperature = weatherResponse.data.current.temperature;

    res.json({
      client_ip: clientIp,
      location: `${location}, ${region}`,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
    });
  } catch (error) {
    res.status(500).send('Error retrieving information');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
