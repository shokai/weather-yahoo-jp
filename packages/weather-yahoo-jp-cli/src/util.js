import 'date-utils'
import chalk from 'chalk'

Date.prototype.getDayJP = function () {
  return '日月火水木金土'[this.getDay()]
}

Date.prototype.toString = function () {
  return `${this.toFormat('M/D')}(${this.getDayJP()})`
}

Array.prototype.__defineGetter__('last', function () {
  return this[this.length - 1]
})

Array.prototype.__defineSetter__('last', function (val) {
  return this[this.length - 1] = val
})

export function temperatureString (temp) {
  var str = `最高気温${temp.high}度`
  if (temp.highDiff > 0) {
    str += chalk.bold.red(`[+${temp.highDiff}]`)
  } else if (temp.highDiff < 0) {
    str += chalk.bold.blue(`[${temp.highDiff}]`)
  } else if (temp.highDiff === 0) {
    str += '[+-0]'
  }

  str += ` 最低気温${temp.low}度`
  if (temp.lowDiff > 0) {
    str += chalk.bold.red(`[+${temp.lowDiff}]`)
  } else if (temp.lowDiff < 0) {
    str += chalk.bold.blue(`[${temp.lowDiff}]`)
  } else if (temp.lowDiff === 0) {
    str += '[+-0]'
  }
  return str
}
