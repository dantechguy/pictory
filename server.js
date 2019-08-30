// setup express
var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000);


// required files
const io = require('socket.io')(server);
const setupRouting = require('./routing/routing');
const Rooms = require('./dataStructures/rooms');
const Players = require('./dataStructures/players');
const rooms, players;
rooms = new Rooms();
players = new Players();

// routing
setupRouting(app);


// socket connections
io.on('connection', function(socket) {

  socket.on('disconnect', function() {
  });

});

console.log('Server running')