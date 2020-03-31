const stateTime = require('./stateTime');
const removeExitPlayers = require('./removeExitPlayers');

function nextState(roomId) {
  let room = rooms.getRoom(roomId);
  stateTime.cancelPreviousTimeouts(room);
  if (roomIsInLobbyState(room)) {
    assignFollowChain(room);
  }
  removeExitPlayers(room);
  moveAllPlayerDataToTargetPlayerChain(room);
  moveAllNewPlayerDataToPreviousData(room);
  room.setAllPlayersNotReady();
  if (room.gameOver()) {
    changeToReplayState(room);
  } else {
    changeToNextState(room);
    round++;
    stateTime.setTimeLimit(room);
    stateTime.setTimeoutToEnforceNextState(room);
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
    player = players.getPlayer(sessionId);
    followPlayerIndex = (index+1) % room.players.length;
    followPlayerSessionId = room.players[followPlayerIndex];
    player.setFollowing(followPlayerSessionId);
  })
}

function shufflePlayers(room) {
  for (let i = room.players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [room.players[i], room.players[j]] = [room.players[j], room.players[i]];
  }
}

function moveAllPlayerDataToTargetPlayerChain(room) {
  this.players.forEach(
    this.moveAllPlayerDataToTargetPlayerChain(room)
  );
}

function movePlayerDataTargetPlayerChain(room) {
  return (sessionId, index) => {
    let data = players.getPlayerData(sessionId);
    let targetPlayerIndex = (index + room.round) % room.players.length;
    let targetPlayerSessionId = room.players[targetPlayerIndex];
    players.getPlayer(targetPlayerSessionId).putChainData(data);
  }
}

function moveAllNewPlayerDataToPreviousData(room) {
  room.players.forEach((sessionId) => {
    players.moveNewDataToPreviousData(sessionId);
  });
}

function changeToReplayState(room) {
  room.setState(values.state.REPLAY);
}

function changeToNextState(room) {
  room.setState(values.next[this.state]);
}

function sendSocketReloadMessage(room) {
  room.sendRoomMessage(values.socket.RELOAD);
}

module.exports = nextState;
