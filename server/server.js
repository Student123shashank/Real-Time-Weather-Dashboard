require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/weather', weatherRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});