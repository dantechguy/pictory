// requried files
const getSessionIdFromSocket = require('./getSessionIdFromSocket');


function playerConnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  if (players.sessionIdExists(sessionId)) { // if session id exists
    let player = players.getPlayer(sessionId);
    player.setConnected();
    let roomId = player.roomId;
    socket.join(roomId);
    l('join', player.t())
    rooms.tryToMoveToNextState(roomId);
  } // if not, then either: user somehow deleted cookie while on game page before socket script loaded
  // or player has just exited or been kicked, as page reloads session id has been removed from 'players'
  // safe to ignore
}

function playerDisconnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  if (players.sessionIdExists(sessionId)) { // if session id exists
    let player = players.getPlayer(sessionId);
    player.setDisconnected();
    let roomId = player.roomId;
    socket.leave(roomId); // still want to leave even if user session id doesnt exist // not sure if this works on /exit
        l('left', player.t())
    rooms.deleteRoomIfAllPlayersDisconnected(roomId);
  } // same as above, if session id invalid
}

module.exports = {
  connected: playerConnected,
  disconnected: playerDisconnected
}
