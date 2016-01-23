"use strict";

const debug = require("debug")("weather-yahoo-jp:forecast");
import superagent from "superagent";
import cheerio from "cheerio";
import _ from "lodash";

import forecastUrl from "../forecast-url.json";

function findForecastUrl(name){
  var where = _.find(Object.keys(forecastUrl), (where) => {
    return where.indexOf(`（${name}）`) > -1;
  });
  if(where) return forecastUrl[where];
  where = _.maxBy(Object.keys(forecastUrl), (where) => {
    return where.indexOf(name);
  });
  if(where.indexOf(name) < 0) throw `forecast URL for "${name}" not exists`;
  return forecastUrl[where];
}

export default class Forecast{

  get(url_or_name){
    var url = /^https?:\/\/.+/.test(url_or_name) ? url_or_name : findForecastUrl(url_or_name);
    return this.getHtml(url)
      .then(this.parse)
      .then((data) => {
        data.url = url;
        return data;
      });
  }

  getHtml(url){
    return new Promise((resolve, reject) => {
      debug(`get ${url}`);
      superagent
        .get(url)
        .end((err, res) => {
          if(err) return reject(err);
          return resolve(res.text);
        });
    });
  }

  parse(html){
    const $ = cheerio.load(html);
    var pref = $("#cat-pass a").eq(-1).text();
    var city = $("title").text().replace(/\s*の天気.+$/, "");
    var year = new Date().getFullYear();
    var m = $(".forecastCity .date").eq(0).text().match(/(\d+)月(\d+)日/);
    var today = new Date(year, m[1] - 1, m[2]);
    m = $(".forecastCity .date").eq(1).text().match(/(\d+)月(\d+)日/);
    var tomorrow = new Date(year, m[1] - 1, m[2]);
    return {
      where: `${pref} ${city}`,
      today: {
        text: $(".forecastCity .pict").eq(0).text(),
        temperature: {
          high: parseInt($(".forecastCity .temp .high em").eq(0).text()),
          low:  parseInt($(".forecastCity .temp .low em").eq(0).text()),
          highDiff: parseInt($(".forecastCity .temp .high").eq(0).text().match(/\[(.+)\]/)[1]),
          lowDiff:  parseInt($(".forecastCity .temp .low").eq(0).text().match(/\[(.+)\]/)[1])
        },
        date: today
      },
      tomorrow: {
        text: $(".forecastCity .pict").eq(1).text(),
        temperature: {
          high: parseInt($(".forecastCity .temp .high em").eq(1).text()),
          low:  parseInt($(".forecastCity .temp .low em").eq(1).text()),
          highDiff: parseInt($(".forecastCity .temp .high").eq(1).text().match(/\[(.+)\]/)[1]),
          lowDiff:  parseInt($(".forecastCity .temp .low").eq(1).text().match(/\[(.+)\]/)[1])
        },
        date: tomorrow
      }
    }
  }

}
