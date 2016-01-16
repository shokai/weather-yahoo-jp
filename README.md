# weather-yahoo-jp
Node.js library for getting weather info from yahoo.co.jp

- https://github.com/shokai/weather-yahoo-jp
- https://npmjs.com/package/weather-yahoo-jp

## YOLP API

- http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html

### Register Your App

- get APP-ID
- https://e.developer.yahoo.co.jp/register

    % export YAHOO_APPID=a1b2cdef3456jkluiop


```javascript
var Weather = require("weather-yahoo-jp");

var yolp = new Weather.YOLP(process.env.YAHOO_APPID);

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
          console.log(where + "は雨が降っています:" + w.observation.rain);
        }
        else{
          console.log(where + "は雨が降っていますが、もうすぐ止みます:" + w.observation.rain);
        }
      }
      else{
        if(w.forecast[0].rain === 0){
          console.log(where + "は雨は降っていません");
        }
        else{
          console.log(where + "は雨は降っていませんが、もうすぐ降ります:" + w.forecast[0].rain);
        }
      }
    }
  })
  .catch(function(err){
    console.error(err.stack || err);
  });
```
