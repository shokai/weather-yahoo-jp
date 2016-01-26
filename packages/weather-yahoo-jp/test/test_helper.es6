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
  assert.isNumber(forecast.today.temperature.highDiff);
  assert.isNumber(forecast.today.temperature.lowDiff);
  assert(forecast.today.temperature.high >= forecast.today.temperature.low);
  assert.instanceOf(forecast.today.date, Date);

  assert.isString(forecast.tomorrow.text);
  assert.isNumber(forecast.tomorrow.temperature.high);
  assert.isNumber(forecast.tomorrow.temperature.low);
  assert.isNumber(forecast.tomorrow.temperature.highDiff);
  assert.isNumber(forecast.tomorrow.temperature.lowDiff);
  assert(forecast.today.temperature.high >= forecast.today.temperature.low);
  assert.instanceOf(forecast.tomorrow.date, Date);

  assert(forecast.tomorrow.date > forecast.today.date);
};
