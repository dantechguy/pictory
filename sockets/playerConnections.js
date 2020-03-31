// requried files
const getSessionIdFromSocket = require('./getSessionIdFromSocket');


function playerConnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  if (players.sessionIdExists(sessionId)) { // if session id exists
    let player = players.getPlayer(sessionId);
    player.setConnected();
    player.socket = socket;
    let roomId = player.roomId;
    socket.join(roomId);
    rooms.tryToMoveToNextState(roomId);
  } // if not, then either: user somehow deleted cookie while on game page before socket script loaded
  // or player has just exited or been kicked, as page reloads session id has been removed from 'players'
  // safe to ignore
}

function playerDisconnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  socket.leave(roomId); // still want to leave even if user session id doesnt exist
  if (players.sessionIdExists(sessionId)) { // if session id exists
    let player = player.getPlayer(sessonId);
    player.setDisconnected();
    player.socket = undefined;
    let roomId = player.roomId;
    rooms.deleteRoomIfAllPlayersDisconnected(roomId);
  } // same as above, if session id invalid
}

module.exports = {
  connected: playerConnected,
  disconnected: playerDisconnected
}
