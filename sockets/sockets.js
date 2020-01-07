// variables
var io;


// required files
var playerConnectDisconnectFunctions = require('./playerConnectDisconnect');
var playerConnected = playerConnectDisconnectFunctions['connected'];
var playerDisconnected = playerConnectDisconnectFunctions['disconnected'];
var playerReady = require('./playerReady');


// functions
function setupSockets(server) {

  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    playerConnected(socket);

    socket.on('disconnect', function(socket) {
      playerDisconnected(socket);
    });

  });

  io.on('ready', function(socket) {
    playerReady(socket);
  });
}


module.exports = setupSockets;