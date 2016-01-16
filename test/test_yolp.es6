/* global it describe */
"use strict";

import "./test_helper";
import assert from "assert";
import Weather from "../src/"


describe("yolp", function(){

  const yolp = new Weather.YOLP(process.env.YAHOO_APPID);

  it("should have method \"getWeather\"", function(){
    assert.equal(typeof yolp["getWeather"], "function");
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
          assert.equal(Object.keys(data).length,  4);
          for(let where in data){
            let weather = data[where];
            assert.equal(typeof weather.geo.latitude, "number");
            assert.equal(typeof weather.geo.longitude, "number");
            assert.equal(typeof weather.observation.rain, "number"); // observation
            assert(weather.observation.date instanceof Date);
            assert(weather.forecast instanceof Array); // forecast
            assert.equal(typeof weather.forecast[0].rain, "number");
            assert(weather.forecast[0].date instanceof Date);
          }
        });
    });

  });
});
