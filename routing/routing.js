// variables
let publicFolder = '/../public/'
var app;
var server;


// required files
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const responseFunctions = require('./responseFunctions');
const denyInvalidSessionId = responseFunctions.sessionId;
const handleIndexGetRequest = require('./handleIndexGetRequest');
const handleJoinPostRequest = require('./handleJoinPostRequest');
const handleGameGetRequest = require('./handleGameGetRequest');
// const handleTimeGetRequest = require('./handleTimeGetRequest');
const handleDataPutRequest = require('./handleDataPutRequest');
const handleDataGetRequest = require('./handleDataGetRequest');
const handleExitPostRequest = require('./handleExitPostRequest');


// functions
function setupRoutingAndReturnServer() {

  app = express();
  app.use(express.json({ limit: '100KB' })); // allows json body to be automatically parsed, limits size to 50KB
  app.use(cookieParser());
  server = app.listen(process.env.PORT || 3000);

  app.use(express.static(path.resolve(__dirname + publicFolder)));

  app.post('/join', (req, res) => {
    handleJoinPostRequest(req, res);
  });

  app.get('/game', denyInvalidSessionId, (req, res) => {
    handleGameGetRequest(req, res);
  });

  // app.get('/time', denyInvalidSessionId, (req, res) => {
  //   handleTimeGetRequest(req, res);
  // });

  app.put('/data', denyInvalidSessionId, (req, res) => {
    handleDataPutRequest(req, res);
  });

  app.get('/data', denyInvalidSessionId, (req, res) => {
    handleDataGetRequest(req, res);
  });


  app.post('/exit', denyInvalidSessionId, (req, res) => {
    handleExitPostRequest(req, res);
  })


  return server;

}




module.exports = setupRoutingAndReturnServer;
