// variables
var io;


// required files
const playerConnection = require('./playerConnections');
const sendRoomMessageFunctionFunction = require('./sendRoomMessage');


// functions
function setupSockets(server) {

  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    playerConnection.connected(socket);

    socket.on('disconnect', function() {
      playerConnection.disconnected(socket);
    });

  });
  return sendRoomMessageFunctionFunction(io);
}


module.exports = setupSockets;
