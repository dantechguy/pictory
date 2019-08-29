// setup express
var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000);


// required files
const io = require('socket.io')(server);
const setupRouting = require('./routing/routing');
const rooms = require('./rooms/rooms')

// routing
setupRouting(app);


// socket connections

io.on('connection', function(socket) {

  socket.on('disconnect', function() {
  });

});