// requried files
const getSessionIdFromSocket = require('./getSessionIdFromSocket');


function playerConnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  let player = players.getPlayer(sessionId);
  player.setConnected();
  player.socket = socket;
  let roomId = player.roomId;
  socket.join(roomId);
}

function playerDisconnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  let player = player.getPlayer(sessonId);
  player.setDisconnected();
  player.socket = undefined;
  let roomId = player.roomId;
  socket.leave(roomId);
  
}

module.exports = {
  connected: playerConnected,
  disconnected: playerDisconnected
}
