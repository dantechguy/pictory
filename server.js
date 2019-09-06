// setup express
var express = require('express');

var app = express();

var server = app.listen(3000, '0.0.0.0');

// required files
const io = require('socket.io')(server);
const setupRouting = require('./routing/routing');
const Rooms = require('./dataStructures/rooms');
const Players = require('./dataStructures/players');


// data structures
global.rooms, global.players;
global.rooms = new Rooms();
global.players = new Players();

// routing
setupRouting(app);


// socket connections
io.on('connection', function(socket) {

  socket.on('disconnect', function() {
  });

});

console.log('Server running');