import axios from 'axios'
import {parseDateString} from './util'
import _ from 'lodash'

const debug = require('debug')('weather-yahoo-jp:yolp')

export default class Yolp {
  constructor (appid) {
    if (!appid) throw new Error('Yahoo APP_ID missing')
    this.appid = appid
    this.defaultParams = Object.freeze({
      output: 'json'
    })
  }

  async get (params) {
    if (typeof params !== 'object') throw new Error('params required')
    params = Object.assign(params, this.defaultParams)
    if (!params.coordinates) throw new Error('param "coordinates" is missing')
    if (!params.appid) params.appid = this.appid
    const coordinates = Object.values(params.coordinates).join(encodeURIComponent(' '))
    delete params.coordinates
    const res = await axios({
      method: 'get',
      url: `http://weather.olp.yahooapis.jp/v1/place?coordinates=${coordinates}`,
      params: params
    })
    debug(res.data.ResultInfo)
    return res.data
  }

  async getWeather (params) {
    if (typeof params !== 'object') throw new Error('params required')
    const mapParams = params.map
    delete params.map
    const coordinates = params.coordinates
    const res = await this.get(params)

    const result = {}
    for (let feature of res.Feature) {
      const [lon, lat] = feature.Geometry.Coordinates.split(',').map(i => { return i - 0 })
      const where = _
        .chain(coordinates)
        .toPairs()
        .minBy((i) => {
          let [lon2, lat2] = i[1].split(',')
          return Math.abs(lon - lon2) + Math.abs(lat - lat2)
        })
        .first()
        .value()
      const weathers = feature.Property.WeatherList.Weather
      const observation = weathers.find(i => i.Type === 'observation')
      result[where] = {
        where: where,
        geo: {
          latitude: lat,
          longitude: lon
        },
        map: this.getMap(Object.assign({lat: lat, lon: lon, z: 10, overlay: 'type:rainfall'}, mapParams)),
        observation: {
          rain: observation.Rainfall,
          date: parseDateString(observation.Date)},
        forecast: weathers
          .filter(i => i.Type === 'forecast')
          .map(i => ({
            rain: i.Rainfall,
            date: parseDateString(i.Date)
          }))
          .sort((a, b) => a.date > b.date)
      }
    }
    return result
  }

  // http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/static.html
  getMap (params) {
    if (!params.appid) params.appid = this.appid
    const query = Object.keys(params).map(k => { return `${k}=${params[k]}` }).join('&')
    return `http://map.olp.yahooapis.jp/OpenLocalPlatform/V1/static?${query}`
  }
}
