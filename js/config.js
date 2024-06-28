const dotenv = require("dotenv");

dotenv.config();
module.exports = {
  weatherApiKey: process.env.WEATHER_API_KEY,
};
