function setTimeLimit(room) {
  room.time = new Date() + values.time[room.state];
}

function setTimeoutToEnforceNextState(room) {
  room.timeOut = setTimeout(
    notAllPlayersAreReadyOrConnectedByTimeLimit,
    values.time[room.state],
    room, // pass reference of room to callback
  );
}

function notAllPlayersAreReadyOrConnectedByTimeLimit(room) {
  room.setAllPlayersReady();
  if (room.allPlayersConnected()) { // all players are ready and connected
    room.nextState();
  } else { // at least one player not connected
    setTimeoutToEnforceConnection(room)
  }
}

function setTimeoutToEnforceConnection(room) {
  room.timeOut = setTimeout(
    playerNotConnectingByExtraTimeLimit,
    values.time.CONNECT,
    room, // pass reference of room to callback
  );
}

function playerNotConnectingByExtraTimeLimit(room) {
  room.getDisconnectedPlayers.forEach((sessionId) => {
    players.setPlayerToExit(sessionId);
  });
  room.nextState(); // all players are connected, or have been set 'exit' and will be kicked
}

function cancelPreviousTimeouts(room) {
  clearTimeout(room.timeOut);
}

module.exports = {
  setTimeLimit: setTimeLimit,
  setTimeoutToEnforceNextState: setTimeoutToEnforceNextState,
  cancelPreviousTimeouts: cancelPreviousTimeouts,
}
