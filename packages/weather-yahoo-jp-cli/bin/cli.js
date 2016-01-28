#!/usr/bin/env node

"use strict";

var handler = require("../lib/main").handler;
handler(process.argv.slice(2));
