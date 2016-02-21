"use strict";

// var Yolp = require("weather-yahoo-jp").Yolp;
var Yolp = require("../").Yolp;

var yolp = new Yolp(process.env.YAHOO_APPID);

var query = {
  coordinates: {
    東京: "139.7667157,35.6810851",
    京都: "135.7605917,35.0075224",
    沖縄: "128.0150716,26.5918277",
    新潟: "139.0618657,37.9123509"
  }
};

yolp.getWeather(query)
  .then(function(data){
    for(var where in data){
      var w = data[where];
      if(w.observation.rain > 0){
        if(w.forecast[0].rain > 0){
          console.log(where + "は雨が" + w.observation.rain + "降っています");
        }
        else{
          console.log(where + "でもうすぐ雨が止みます");
        }
      }
      else{
        if(w.forecast[0].rain === 0){
          console.log(where + "は雨が降っていません");
        }
        else{
          console.log(where + "でもうすぐ雨が" + w.forecast[0].rain + "降ります");
        }
      }
      console.log(w.map);
    }
  })
  .catch(function(err){
    console.error(err.stack || err);
  });
