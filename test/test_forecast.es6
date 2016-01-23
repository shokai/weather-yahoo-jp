/* global it describe */
"use strict";

import "./test_helper";
import {assert} from "chai";
import {forecast} from "../src/";


describe("Forecast", function(){

  it("should have method \"get\"", function(){
    assert.isFunction(forecast["get"]);
  });

  describe("method \"get\"", function(){

    it("should return Forecast of URL", function(){
      this.timeout(10000);
      return forecast
        .get("http://weather.yahoo.co.jp/weather/jp/14/4610.html")
        .then((forecast) => {
          assert.isForecast(forecast);
          assert.match(forecast.where, /神奈川県.+横浜/);
        });
    });

    it("should return Forecast of Place Name", function(){
      this.timeout(10000);
      return forecast
        .get("京都")
        .then((forecast) => {
          assert.isForecast(forecast);
          assert.match(forecast.where, /京都府.+京都/);
        });
    });

  });
});
