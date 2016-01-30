"use strict";

const debug = require("debug")("weather-yahoo-jp:yolp");
import axios from "axios";
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
    if(typeof params !== "object") return Promise.reject("params required");
    for(let k in this.defaultParams){
      if(!params.hasOwnProperty(k)) params[k] = this.defaultParams[k];
    }
    if(!params.coordinates) return Promise.reject('param "coordinates" is missing');
    if(!params.appid) params.appid = this.appid;
    const coordinates = _.values(params.coordinates).join(encodeURI(' '));
    delete params.coordinates
    return axios({
      method: "get",
      url: `http://weather.olp.yahooapis.jp/v1/place?coordinates=${coordinates}`,
      params: params
      }).then((res) => {
        debug(res.data.ResultInfo);
        return res.data;
      })
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
