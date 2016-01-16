# YOLP (Yahoo Open Local Plaftorm) Weather API sample

- http://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html


## build this library

    % npm i
    % npm run build


## Register Your App

- get APP-ID
- https://e.developer.yahoo.co.jp/register


## Run

    % export YAHOO_APPID=a1b2cdef3456jkluiop
    % node samples/yolp.js
    % node DEBUG=weather* samples/yolp.js

```
東京は雨は降っていません
京都は雨は降っていませんが、もうすぐ降ります:0.65
沖縄は雨は降っていません
新潟は雨が降っていますが、もうすぐ止みます:0.55
```