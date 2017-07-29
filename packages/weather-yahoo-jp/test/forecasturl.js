/* global it describe */

import './helper'
import {assert} from 'chai'
import _ from 'lodash'

import forecastUrl from '../forecast-url.json'

describe('forecast-url.json', function () {
  var names = ['東京', '京都', '札幌', '道南', '広島', '新潟', '鹿児島',
    '神奈川県', '横浜', '愛知県', '名古屋', '山形', '奄美']

  for (let name of names) {
    it(`should have ${name}`, function () {
      var exist = _.find(Object.keys(forecastUrl), (key) => {
        return key.indexOf(name) > -1
      })
      assert(exist)
    })
  }

  it('should have URL of weather.yahoo.co.jp', function () {
    for (let url of _.values(forecastUrl)) {
      assert.match(url, /^https?:\/\/weather.yahoo.co.jp\/weather\/jp\/[\da-z]+\/\d+\.html$/)
    }
  })
})
