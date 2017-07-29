// create forecast URL list

/* eslint no-console: 0 */
/* global Promise */

import fs from 'fs'
import {forecast} from '../src/'
import co from 'co'
import cheerio from 'cheerio'
import axios from 'axios'
import _ from 'lodash'

const fname = process.argv[2] || 'forecast-url.json'
console.log(`output file => ${fname}`)

co(function * () {
  var result = {}
  var areas = yield getLinksInMap(fullpath('/weather/?day=1'))
  console.log(areas)
  yield delay(3000)
  for (let area of areas) {
    let prefs = yield getLinksInMap(area)
    console.log(prefs)
    yield delay(3000)
    for (let pref of prefs) {
      let cities = yield getLinksInMap(pref)
      console.log(cities)
      yield delay(3000)
      for (let city of cities) {
        let weather = yield forecast.get(city)
        console.log(city)
        console.log(weather)
        result[weather.where] = weather.url
        yield delay(3000)
      }
    }
  }
  console.log(Object.keys(result).length + ' forecast URLs found')
  console.log(`writing ${fname}`)
  fs.writeFileSync(fname, JSON.stringify(result, null, 2))
  console.log('done')
}).catch((err) => {
  console.error(err.stack || err)
})

function delay (msec) {
  console.log(`delay ${msec} msec`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, msec)
  })
}

function getLinksInMap (url) {
  return co(function * () {
    var html = (yield axios.get(url)).data
    var $ = cheerio.load(html)
    var links = $('.point a').map(function (i, el) {
      return fullpath($(el).attr('href'))
    }).get()
    return _.uniq(links)
  })
}

function fullpath (path) {
  if (/^\//.test(path)) return 'http://weather.yahoo.co.jp' + path
  if (/^https?:\/\/.+/.test(path)) return path
  throw `cannot get fullpath of ${path}`
}
