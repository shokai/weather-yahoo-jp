/* eslint no-console: 0 */

import pkg from '../package.json'
import {temperatureString} from './util'
import {forecast} from 'weather-yahoo-jp'

module.exports.handler = async function (argv) {
  if (argv.length < 1) {
    console.log(
`${pkg.name} v${pkg.version}

 % weather-yahoo-jp [地名...]`)
    process.exit(1)
  }

  for (let where of argv) {
    const res = await forecast.get(where)
    const msgs = []
    msgs.push(res.where)
    msgs.push(`${res.today.date} ${res.today.text} ${temperatureString(res.today.temperature)}`)
    msgs.push(`${res.tomorrow.date} ${res.tomorrow.text} ${temperatureString(res.tomorrow.temperature)}`)
    msgs.push(res.url)
    console.log(msgs.join('\n'))
  }
}
