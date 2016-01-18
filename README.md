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
get forecast from webpage

```javascript
var forecast = require("weather-yahoo-jp").forecast;

forecast
  .get("横浜")
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
  tomorrow: { text: '晴れ', temperature: { high: 8, low: 3 } },
  url: 'http://weather.yahoo.co.jp/weather/jp/14/4610.html'
}
```


### YOLP

- Yahoo Open Local Platform 気象情報API
- http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html


[Register Your App](https://e.developer.yahoo.co.jp/register) to get APPID


    % export YAHOO_APPID=a1b2cdef3456jkluiop


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
    }
  })
  .catch(function(err){
    console.error(err.stack || err);
  });
```

```
東京でもうすぐ雨が止みます
京都でもうすぐ雨が0.25降ります
沖縄は雨が1.65降っています
新潟は雨が降っていません
```


## Develop

    % npm i
    % npm run build
    % npm run watch

## Test

    % npm test
    % DEBUG=weather* npm test
