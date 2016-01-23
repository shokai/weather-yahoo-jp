"use strict";

process.env.NODE_ENV = "test";

import {assert} from "chai";

assert.isForecast = function(forecast){
  assert.isString(forecast.where);
  assert.match(forecast.url, /^https?:\/\/weather\.yahoo\.co\.jp.+/);
  assert.isString(forecast.where);
  assert.isString(forecast.today.text);
  assert.isNumber(forecast.today.temperature.high);
  assert.isNumber(forecast.today.temperature.low);
  assert(forecast.today.temperature.high >= forecast.today.temperature.low);
  assert.isString(forecast.tomorrow.text);
  assert.isNumber(forecast.tomorrow.temperature.high);
  assert.isNumber(forecast.tomorrow.temperature.low);
};
