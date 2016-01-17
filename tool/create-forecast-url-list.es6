// create forecast URL list

"use strict";

import Promise from "bluebird";
import {Forecast} from "../src/"
import co from "co";
import cheerio from "cheerio";
import superagent from "superagent";
import _ from "lodash";

const fs = Promise.promisifyAll(require("fs"));
const forecast = new Forecast();

const fname = process.argv[2];
console.log(`output file name: ${fname}`);

co(function *(){
  var result = {};
  var areas = yield getLinksInMap(fullpath("/weather/?day=1"));
  console.log(areas);
  yield delay(3000);
  for(let area of areas){
    let prefs = yield getLinksInMap(area);
    console.log(prefs);
    yield delay(3000);
    for(let pref of prefs){
      let cities = yield getLinksInMap(pref);
      console.log(cities);
      yield delay(3000);
      for(let city of cities){
        let weather = yield forecast.get(city);
        console.log(city);
        console.log(weather);
        result[weather.where] = weather.url;
        yield delay(3000);
      }
    }
  }
  console.log(Object.keys(result).length + " forecast URLs found");
  console.log(`writing ${fname}`);
  yield fs.writeFile(fname, JSON.stringify(result, null, 2));
  console.log("done");
}).catch((err) => {
  console.error(err.stack || err);
});

function delay(msec){
  console.log(`delay ${msec} msec`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, msec);
  });
}

function getPage(url){
  console.log(`get ${url}`);
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .end((err, res) => {
        if(err) return reject(err);
        return resolve(res.text);
      });
  });
}

function getLinksInMap(url){
  return co(function *(){
    var html = yield getPage(url);
    var $ = cheerio.load(html);
    var links = $(".point a").map(function(i, el){
      return fullpath($(el).attr("href"));
    }).get();
    return _.uniq(links);
  });
}

function fullpath(path){
  if(/^\//.test(path)) return "http://weather.yahoo.co.jp" + path;
  if(/^https?:\/\/.+/.test(path)) return path;
  throw `cannot get fullpath of ${path}`;
}
