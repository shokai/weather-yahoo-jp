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
    return {
      where: `${pref} ${city}`,
      today: {
        text: $(".forecastCity .pict").eq(0).text(),
        temperature: {
          high: $(".forecastCity .temp .high em").eq(0).text() - 0,
          low: $(".forecastCity .temp .low em").eq(0).text() - 0
        }
      },
      tomorrow: {
        text: $(".forecastCity .pict").eq(1).text(),
        temperature: {
          high: $(".forecastCity .temp .high em").eq(1).text() - 0,
          low:  $(".forecastCity .temp .low em").eq(1).text() - 0
        }
      }
    }
  }

}
