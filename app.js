var express = require('express');
var request = require('request');
//require('request-debug')(request);
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var port = process.env.VCAP_APP_PORT || 8080;

var DATA_SOURCE = {
  apiKey: 'a-e0u82m-gnf2vqkjhh',
  apiToken: 'CPZV9(T(Aj*BFC2bBp',
  apiURL: 'https://e0u82m.internetofthings.ibmcloud.com/api/v0002/historian/types/ESP8266/devices/DHT11-1'
};

var app = express();
app.use(express.static(__dirname + '/public'));

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);

});

app.use(function(req, res, next) {
  console.log('filter', req.url);
  next();
});
app.get("/", function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get("/1", function(req, res, next) {
  var connURL = DATA_SOURCE.apiURL;
  var headers = {
    'Content-Type': 'application/json'
  };
  try {
    req.pipe(request({
      'method': 'GET',
      'uri': connURL,
      'timeout': 30000,
      'headers': headers,
      'auth': {
        'user': DATA_SOURCE.apiKey,
        'pass': DATA_SOURCE.apiToken
      }
    })).pipe(res);
  } catch (e) {
    console.log('Error', e);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end('[]');
  }
});
