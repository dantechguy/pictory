// variables
var io;


// required files
const playerConnection = require('./playerConnections');


// functions
function setupSockets(server) {

  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    playerConnection.connected(socket);

    socket.on('disconnect', function() {
      playerConnection.disconnected(socket);
    });

  });
  return io;
}


module.exports = setupSockets;
