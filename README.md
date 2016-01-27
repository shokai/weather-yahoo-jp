# weather-yahoo-jp
get weather info from yahoo.co.jp

- https://github.com/shokai/weather-yahoo-jp

[![Circle CI](https://circleci.com/gh/shokai/weather-yahoo-jp.svg?style=svg)](https://circleci.com/gh/shokai/weather-yahoo-jp)


## Packages
- weather-yahoo-jp
- weather-yahoo-jp-cli

in `./packages/`


## Develop

    % npm install
    % npm run bootstrap
    % npm run build
    % npm run watch


### Test
[Register Your App](https://e.developer.yahoo.co.jp/register) to get APPID

    % export YAHOO_APPID=a1b2cdef3456jkluiop
    % npm test
    % DEBUG=weather* npm test


### Build forecast-url.json

    % npm run build:urllist


## Note

- [橋本商会 » Node.jsでYahooから天気予報とリアルタイム降雨データを取得する](http://shokai.org/blog/archives/10542)
