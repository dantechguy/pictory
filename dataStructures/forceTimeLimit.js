function setTimeoutToEnforceNextState(room) { // main time limit
  room.timeouts.forceStateChange = setTimeout(
    notAllPlayersAreReadyOrConnectedByTimeLimit,
    values.time[room.state],
    room, // pass reference of room to callback
  );
}

function notAllPlayersAreReadyOrConnectedByTimeLimit(room) {
  room.setAllPlayersReadyandFillEmptyData();
  room.sendSocketPlayerStatusUpdate();
  if (room.allPlayersAreReadyAndConnectedOrToExit()) { // all players are ready and connected
    l(`  time limit [${room.getRoomId()}] ready`);
    room.tryToMoveToNextState();
  } else { // at least one player not connected
    l(`  time limit [${room.getRoomId()}] force`);
    setTimeoutToEnforceConnection(room)
  }
}

function setTimeoutToEnforceConnection(room) {
  room.timeouts.forceStateChange = setTimeout(
    playerNotConnectingByExtraTimeLimit,
    values.time.CONNECT,
    room, // pass reference of room to callback
  );
}

function playerNotConnectingByExtraTimeLimit(room) {
  l(`  time limit [${room.getRoomId()}] exit`);
  room.getDisconnectedPlayersWhoAreNotToExit().forEach((sessionId) => {
    l(`  ${players.player(sessionId).t()} to exit`)
    players.player(sessionId).setToExit();
  });
  room.tryToMoveToNextState(); // all players are connected, or have been set 'exit' and will be kicked
}

function cancelPreviousForceNextStateTimeout(room) {
  clearTimeout(room.timeouts.forceStateChange);
}

module.exports = {
  setTimeoutToEnforceNextState: setTimeoutToEnforceNextState,
  cancelPreviousForceNextStateTimeout: cancelPreviousForceNextStateTimeout,
}
