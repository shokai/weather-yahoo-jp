"use strict";

// var forecast = require("weather-yahoo-jp").forecast;
var forecast = require("../").forecast;

var where = process.argv[2] || "横浜";

forecast
  .get(where)
  .then((forecast) => {
    console.log(forecast);
    console.log(forecast.today.text);
    console.log("気温" + forecast.today.temperature.low + "度〜" + forecast.today.temperature.high + "度");
  })
  .catch((err) => {
    console.error(err.stack || err);
  });
