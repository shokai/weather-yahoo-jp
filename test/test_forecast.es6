/* global it describe */
"use strict";

import "./test_helper";
import {assert} from "chai";
import {Forecast} from "../src/";


describe("Forecast", function(){

  const forecast = new Forecast();

  it("should have method \"get\"", function(){
    assert.isFunction(forecast["get"]);
  });

  describe("method \"get\"", function(){

    it("should return Forecast", function(){
      this.timeout(10000);
      return forecast
        .get("http://weather.yahoo.co.jp/weather/jp/14/4610.html")
        .then((forecast) => {
          assert.isString(forecast.where);
          assert.match(forecast.where, /神奈川県.+横浜/);
          assert.match(forecast.url, /^https?:\/\/weather\.yahoo\.co\.jp.+/);
          assert.isString(forecast.today.text);
          assert.isNumber(forecast.today.temperature.high);
          assert.isNumber(forecast.today.temperature.low);
          assert.isString(forecast.tomorrow.text);
          assert.isNumber(forecast.tomorrow.temperature.high);
          assert.isNumber(forecast.tomorrow.temperature.low);
        });
    });

  });
});
