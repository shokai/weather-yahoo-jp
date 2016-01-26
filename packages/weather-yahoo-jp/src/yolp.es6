"use strict";

const debug = require("debug")("weather-yahoo-jp:yolp");
import superagent from "superagent";
import _ from "lodash";
import util from "./util";

export default class Yolp{

  constructor(appid){
    if(!appid) throw "appid missing";
    this.appid = appid;
    this.defaultParams = Object.freeze({
      output: "json"
    });

  }

  get(params){
    return new Promise((resolve, reject) =>{
      if(typeof params !== "object") return reject("params required");
      for(let k in this.defaultParams){
        if(!params.hasOwnProperty(k)) params[k] = this.defaultParams[k];
      }
      if(!params.coordinates) return reject("param \"coordinates\" required");
      if(!params.appid) params.appid = this.appid;
      const coordinates = params.coordinates;
      delete params.coordinates;
      debug(coordinates);
      superagent
        .get("http://weather.olp.yahooapis.jp/v1/place")
        .query(params)
        .query(
          "coordinates=" + _.values(coordinates).join(encodeURI(' '))
        )
        .end((err, res) => {
          if(err) return reject(err);
          debug(res.body.ResultInfo);
          return resolve(res.body);
        })
    });
  }

  getWeather(params){
    const coordinates = params.coordinates;
    return this.get(params)
      .then((res) => {
        let result = {};
        for(let feature of res.Feature){
          let [lon, lat] = feature.Geometry.Coordinates.split(',').map(i => {return i - 0});
          let where = _
                .chain(coordinates)
                .toPairs()
                .minBy((i) => {
                  let [lon2, lat2] = i[1].split(',');
                  return Math.abs(lon-lon2) + Math.abs(lat-lat2);
                })
                .first()
                .value();
          let weathers = feature.Property.WeatherList.Weather;
          let observation = _.find(weathers, (i) => {return i.Type === "observation"});
          result[where] = {
            where: where,
            geo: {
              latitude: lat,
              longitude: lon
            },
            observation: {
              rain: observation.Rainfall,
              date: util.parseDateString(observation.Date)},
            forecast: weathers
              .filter((i) => {
                return i.Type === "forecast"
              }).map((i) => {
                return {
                  rain: i.Rainfall,
                  date: util.parseDateString(i.Date)
                }
              }).sort((a, b) => {
                return a.date > b.date;
              })
          };
        }
        return result;
      });
  }
}
