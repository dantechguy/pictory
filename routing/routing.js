// variables
let publicFolder = '/../public/'
var app;
var server;


// required files
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var handleIndexGetRequest = require('./handleIndexGetRequest');
var handleJoinGetRequest = require('./handleJoinGetRequest');
var handleGameRequest = require('./handleGameRequest');


// functions
function setupRoutingAndReturnServer() {

  app = express();
  app.use(express.json({ limit: '500KB' })); // allows json body to be automatically parsed, limits size to 500KB
  server = app.listen(process.env.PORT || 3000);

  app.use(express.static(path.resolve(__dirname + publicFolder)));

  app.post('/join', function(req, res) {
    handleJoinGetRequest(req, res);
  });

  app.get('/game', function(req, res) {
    fileDirectory = handleGameRequest(req, res);
  });

  return server;

}




module.exports = setupRoutingAndReturnServer;
