// variables
var io;


// required files
const playerConnectionFunctions = require('./playerConnections');
const playerConnected = playerConnectionFunctions.connected;
const playerDisconnected = playerConnectionFunctions.disconnected;
const sendRoomMessageFunctionFunction = require('./sendRoomMessage');


// functions
function setupSockets(server) {

  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    playerConnected(socket);

    socket.on('disconnect', function(socket) {
      playerDisconnected(socket);
    });

  });
  return sendRoomMessageFunctionFunction(io);
}


module.exports = setupSockets;
