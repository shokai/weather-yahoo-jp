"use strict";

// var Forecast = require("weather-yahoo-jp").Forecast;

var path = require("path");
var Forecast = require(path.resolve()).Forecast;

var forecast = new Forecast();

forecast
  .get("http://weather.yahoo.co.jp/weather/jp/14/4610.html")
  .then((forecast) => {
    console.log(forecast);
    console.log(forecast.today.text);
    console.log("気温" + forecast.today.temperature.low + "度〜" + forecast.today.temperature.high + "度");
  })
  .catch((err) => {
    console.error(err.stack || err);
  });
