const express = require('express');
const axios = require('axios');
const router = express.Router();
const Weather = require('../models/Weather');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;


router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };


    const newWeather = new Weather(weatherData);
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});


router.get('/history', async (req, res) => {
  try {
    const history = await Weather.find().sort({ timestamp: -1 }).limit(5);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

module.exports = router;