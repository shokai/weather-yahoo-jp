/* global it describe */

import "./test_helper";
import {assert} from "chai";
import {Yolp} from "../src/";


describe("yolp", function(){

  const yolp = new Yolp(process.env.YAHOO_APPID);

  it("should have method \"getWeather\"", function(){
    assert.isFunction(yolp["getWeather"]);
  });

  describe("method \"getWeather\"", function(){

    it("should return Weather", function(){

      const query = {
        coordinates: {
          東京: "139.7667157,35.6810851",
          京都: "135.7605917,35.0075224",
          沖縄: "128.0150716,26.5918277",
          新潟: "139.0618657,37.9123509"
        }
      };

      this.timeout(10000);
      return yolp
        .getWeather(query)
        .then((data) => {
          assert.lengthOf(Object.keys(data), 4);
          for(let where in data){
            let weather = data[where];
            assert.isNumber(weather.geo.latitude);
            assert.isNumber(weather.geo.longitude);
            assert.match(weather.map, /^https?:\/\/map\.olp\.yahooapis\.jp.+/);
            assert.isNumber(weather.observation.rain); // observation
            assert.instanceOf(weather.observation.date, Date);
            assert.isArray(weather.forecast); // forecast
            assert.isNumber(weather.forecast[0].rain);
            assert.instanceOf(weather.forecast[0].date, Date);
          }
        });
    });

  });
});
