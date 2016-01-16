/* global it describe */
"use strict";

import "./test_helper";
import assert from "assert";
import Weather from "../src/";


describe("Forecast", function(){

  const forecast = new Weather.Forecast();

  it("should have method \"get\"", function(){
    assert.equal(typeof forecast["get"], "function");
  });

  describe("method \"get\"", function(){

    it("should return Forecast", function(){
      this.timeout(10000);
      return forecast
        .get("http://weather.yahoo.co.jp/weather/jp/13/4410.html")
        .then((forecast) => {
          assert.equal(typeof forecast.today.text, "string");
          assert.equal(typeof forecast.today.temperature.high, "number");
          assert.equal(typeof forecast.today.temperature.low, "number");
          assert.equal(typeof forecast.tomorrow.text, "string");
          assert.equal(typeof forecast.tomorrow.temperature.high, "number");
          assert.equal(typeof forecast.tomorrow.temperature.low, "number");
        });
    });

  });
});
