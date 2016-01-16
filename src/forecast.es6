"use strict";

const debug = require("debug")("weather-yahoo-jp:forecast");
import superagent from "superagent";
import cheerio from "cheerio";

export default class Forecast{
  constructor(){

  }

  get(url){
    return this.getHtml(url)
      .then(this.parse);
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
