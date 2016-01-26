"use strict";

import {temperatureString} from "./util";
import {forecast} from "weather-yahoo-jp";

module.exports.handler = function(){
  const args = process.argv.slice(2);
  if(args.length < 1){
    console.error("weather-yahoo-jp [地名]");
    process.exit(1);
  }

  forecast
    .get(args[0])
    .then((res) => {
      const msgs = [];
      msgs.push(res.where);

      msgs.push(`${res.today.date} ${res.today.text} ${temperatureString(res.today.temperature)}`);
      msgs.push(`${res.tomorrow.date} ${res.tomorrow.text} ${temperatureString(res.tomorrow.temperature)}`);

      msgs.push(res.url);

      console.log(msgs.join("\n"));
    })
    .catch(function(err){
      console.error(err.stack || err);
    });
}
