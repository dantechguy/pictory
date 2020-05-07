// requried files
const getSessionIdFromSocket = require('./getSessionIdFromSocket');


function playerConnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  if (players.sessionIdExists(sessionId)) { // if session id exists
    let player = players.player(sessionId);
    player.setConnected();
    player.setSocket(socket);
    let roomId = player.roomId;
    let room = rooms.room(roomId);
    l(player.t(), 'connected');
    socket.join(roomId);
    room.sendSocketPlayerStatusUpdate();
    room.cancelPreviousDeleteRoomTimeout();
    room.tryToMoveToNextState();
  } // if not, then either: user somehow deleted cookie while on game page before socket script loaded
  // or player has just exited or been kicked, as page reloads session id has been removed from 'players'
  // safe to ignore
}

function playerDisconnected(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  if (players.sessionIdExists(sessionId)) { // if session id exists
    let player = players.player(sessionId);
    player.setDisconnected();
    player.removeSocket();
    let roomId = player.roomId;
    let room = rooms.room(roomId);
    l(player.t(), 'disconnected');
    socket.leave(roomId); // still want to leave even if user session id doesnt exist // not sure if this works on /exit
    room.sendSocketPlayerStatusUpdate();
    room.deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout(roomId);
  } // same as above, if session id invalid
}

module.exports = {
  connected: playerConnected,
  disconnected: playerDisconnected
}
