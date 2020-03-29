// requried files
var getSessionIdFromSocket = require('./getSessionIdFromSocket');

function playerReady(socket) {
  let sessionId = getSessionIdFromSocket(socket);
  let player = players.getPlayerWithId(sessionId);
  player.setToReady();
  let room = rooms.getRoomWithId(player.roomId);

}


module.exports = playerReady;