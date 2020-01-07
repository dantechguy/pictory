// requried files
var getSessionIdFromSocket = require('./getSessionIdFromSocket');


function playerConnected(socket) {
  let sessionId = getSessionId(socket);
  let player = players.getPlayerWithId(sessionId);
  player.connected = true;
  player.socket = socket;
  let roomId = player.roomId;
  socket.join(roomId);
}

function playerDisconnected(socket) {
  let sessionId = getSessionId(socket);
  let player = player.getPlayerWithId(sessonId);
  player.connected = false;
  player.socket = undefined;
  let roomId = player.roomId;
  socket.leave(roomId);
}

module.exports = {
  'connected': playerConnected,
  'disconnected': playerDisconnected
}