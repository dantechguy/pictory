// requried files
var getSessionIdFromSocket = require('./getSessionIdFromSocket');

function playerReady(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  let player = players.getPlayer(sessionId);
  player.setToReady();
  let room = rooms.getRoom(player.roomId);

}


module.exports = playerReady;