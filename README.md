# weather-yahoo-jp
Node.js library for getting weather info from yahoo.co.jp

- https://github.com/shokai/weather-yahoo-jp
- https://npmjs.com/package/weather-yahoo-jp

[![Circle CI](https://circleci.com/gh/shokai/weather-yahoo-jp.svg?style=svg)](https://circleci.com/gh/shokai/weather-yahoo-jp)

## Install

    % npm i weather-yahoo-jp


## Samples

see [samples directory](https://github.com/shokai/weather-yahoo-jp/tree/master/samples)


## Usage

### Forcast
get forecast info from webpage

    % node samples/forecast.js

```javascript
var Forecast = require("weather-yahoo-jp").Forecast;
var forecast = new Weather.Forecast();

forecast
  .get("http://weather.yahoo.co.jp/weather/jp/14/4610.html")
  .then((forecast) => {
    console.log(forecast);
  })
  .catch((err) => {
    console.error(err.stack || err);
  });
```

```javascript
{
  where: '神奈川県 東部（横浜）',
  today: { text: '曇後雨', temperature: { high: 9, low: 4 } },
  tomorrow: { text: '雨後曇', temperature: { high: 8, low: 3 } }
}
```


### YOLP

- [Yahoo Open Local Platform 気象情報API](http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html)
- [Register Your App to get APP-ID](https://e.developer.yahoo.co.jp/register)


Run

    % export YAHOO_APPID=a1b2cdef3456jkluiop
    % node samples/yolp.js


```javascript
var Yolp = require("weather-yahoo-jp").Yolp;
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

```
東京は雨は降っていません
京都は雨は降っていませんが、もうすぐ降ります:0.65
沖縄は雨は降っていません
新潟は雨が降っていますが、もうすぐ止みます:0.55
```


## Develop

    % npm i
    % npm run build
    % npm run watch

## Test

    % npm test
    % DEBUG=weather* npm test
