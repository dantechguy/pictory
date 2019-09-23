// variables


// required files
var io;


// functions
function setupSockets(server) {

  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    socket.emit('connection');

    socket.on('disconnect', function() {
      console.log('disconnection!');
    });

  });
}




module.exports = setupSockets;