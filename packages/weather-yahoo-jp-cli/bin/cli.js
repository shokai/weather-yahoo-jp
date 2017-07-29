#!/usr/bin/env node

'use strict'
require('babel-polyfill')

var handler = require('../lib/main').handler
handler(process.argv.slice(2))
