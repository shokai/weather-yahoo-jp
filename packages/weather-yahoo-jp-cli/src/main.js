/* eslint no-console: 0 */

import pkg from '../package.json'
import {temperatureString} from './util'
import {forecast} from 'weather-yahoo-jp'

module.exports.handler = function (argv) {
  if (argv.length < 1) {
    console.log(`${pkg.name} v${pkg.version}`)
    console.log()
    console.log(' % weather-yahoo-jp [地名...]')
    process.exit(1)
  }

  argv.forEach((where) => {
    forecast
      .get(where)
      .then((res) => {
        const msgs = []
        msgs.push(res.where)
        msgs.push(`${res.today.date} ${res.today.text} ${temperatureString(res.today.temperature)}`)
        msgs.push(`${res.tomorrow.date} ${res.tomorrow.text} ${temperatureString(res.tomorrow.temperature)}`)
        msgs.push(res.url)
        console.log(msgs.join('\n'))
      })
      .catch(function (err) {
        console.error(err.stack || err)
      })
  })
}
