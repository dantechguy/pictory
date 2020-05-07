const forceTimeLimit = require('./forceTimeLimit');
const removeExitPlayers = require('./removeExitPlayers');

function tryToMoveToNextState(room) {
  l(`  try to move to next state [${room.getRoomId()}]`)
  if (room.allPlayersAreReadyAndConnectedOrToExit()) {
    l(`  next state [${room.getRoomId()}]`)
    nextState(room);
  }
}

function nextState(room) {
  forceTimeLimit.cancelPreviousForceNextStateTimeout(room);
  if (roomIsInLobbyState(room)) {
    assignFollowChain(room);
  }
  removeExitPlayers(room);
  moveAllNewPlayerDataToPreviousData(room);
  if (room.getState() !== values.state.LOBBY) {
    moveAllPlayerDataToTargetPlayerChain(room);
  }
  room.setAllPlayersNotReady();
  if (room.gameOver()) {
    changeToReplayState(room);
  } else {
    changeToNextState(room);
    room.round++;
    room.setTimeLimit();
    forceTimeLimit.setTimeoutToEnforceNextState(room);
  }
  sendSocketReloadMessage(room);
}

function roomIsInLobbyState(room) {
  return room.getState() === values.state.LOBBY;
}

function assignFollowChain(room) {
  let player, followPlayerIndex, followPlayerSessionId;
  shufflePlayers(room);
  room.players.forEach((sessionId, index) => {
    player = players.player(sessionId);
    followPlayerIndex = (index+1) % room.players.length;
    followPlayerSessionId = room.players[followPlayerIndex];
    player.setFollowingTo(followPlayerSessionId);
  })
}

function shufflePlayers(room) {
  for (let i = room.players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [room.players[i], room.players[j]] = [room.players[j], room.players[i]];
  }
}

function moveAllPlayerDataToTargetPlayerChain(room) {
  room.players.forEach(
    movePlayerDataTargetPlayerChain(room)
  );
}

function movePlayerDataTargetPlayerChain(room) {
  return (sessionId, index) => {
    let player = players.player(sessionId);
    let data = {name: player.getName(), prompt: player.getData()};
    let targetPlayerIndex = (index + room.round - 1) % room.players.length;
    let targetPlayerSessionId = room.players[targetPlayerIndex];
    players.player(targetPlayerSessionId).putChainData(data);
  };
}

function moveAllNewPlayerDataToPreviousData(room) {
  room.players.forEach((sessionId) => {
    players.player(sessionId).moveNewDataToPreviousData();
  });
}

function changeToReplayState(room) {
  room.setState(values.state.REPLAY);
}

function changeToNextState(room) {
  room.setState(values.next[room.state]);
}

function sendSocketReloadMessage(room) {
  room.sendSocketMessage(values.socket.RELOAD);
}

module.exports = tryToMoveToNextState;
