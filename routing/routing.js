// variables
let publicFolder = '/../public/'
var app;
var server;


// required files
var path = require('path');
var express = require('express');
var handleIndexGetRequest = require('./handleIndexGetRequest');
var handleJoinGetRequest = require('./handleJoinGetRequest');
var handleGameRequest = require('./handleGameRequest');


// functions
function setupRoutingAndReturnServer() {

  app = express();
  server = app.listen(3000, '0.0.0.0');

  app.use(express.static(path.resolve(__dirname + publicFolder)));

  app.get('/join', function(req, res) {
    handleJoinGetRequest(req, res);
  });

  app.get('/game', function(req, res) {
    fileDirectory = handleGameRequest(req, res);
  });

  return server;

}




module.exports = setupRoutingAndReturnServer;