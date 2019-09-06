// variables


// required files
var express = require('express');
var handleIndexGetRequest = require('./handleIndexGetRequest');
var handleJoinGetRequest = require('./handleJoinGetRequest');
var getFileForStateForGameRequest = require('./getFileForStateForGameRequest');


// functions
function setupRouting(app) {

  app.use(express.static('public'));

  app.get('/join', function(req, res) {
    handleJoinGetRequest(req, res);
  });

  app.get('/game', function(req, res) {
    userId = req.query.id;
    fileDirectory = getFileForStateForGameRequest(userId);
    res.sendFile(fileDirectory);
  });

}




module.exports = setupRouting;