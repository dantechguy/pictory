// variables
let publicFolder = '/../public/'
var app;
var server;


// required files
const path = require('path');
const express = require('express');
const responseFunctions = require('./responseFunctions');
const checkSessionId = responseFunctions.sessionId;
const handleIndexGetRequest = require('./handleIndexGetRequest');
const handleJoinPostRequest = require('./handleJoinPutRequest');
const handleGameGetRequest = require('./handleGameGetRequest');
const handleTimeGetRequest = require('./handleTimeGetRequest');
const handleDataPutRequest = require('./handleDataPutRequest');
const handleDataGetRequest = require('./handleDataGetRequest');
const handleDonePutRequest = require('./handleDonePutRequest');


// functions
function setupRoutingAndReturnServer() {

  app = express();
  app.use(express.json({ limit: '50KB' })); // allows json body to be automatically parsed, limits size to 50KB
  server = app.listen(process.env.PORT || 3000);

  app.use(express.static(path.resolve(__dirname + publicFolder)));

  app.post('/join', (req, res) => {
    handleJoinPostRequest(req, res);
  });

  app.all('/(game|time|data|done|exit)', (req, res) => { // cuts out any request with invalid session id
    checkSessionId(req, res);
  });

  app.get('/game', (req, res) => {
    handleGameGetRequest(req, res);
  });

  app.get('/time', (req, res) => {
    handleTimeGetRequest(req, res);
  });

  app.put('/data', (req, res) => {
    handleDataPutRequest(req, res);
  });

  app.get('/data', (req, res) => {
    handleDataGetRequest(req, res);
  });

  app.put('/done', (req, res) => {
    handleDonePutRequest(req, res);
  })


  return server;

}




module.exports = setupRoutingAndReturnServer;
