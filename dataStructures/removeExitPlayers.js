function removeExitPlayers(room) {
  room.getPlayers().forEach((sessionId, index) => {
    if (players.player(sessionId).isToExit()) {
      safeRemovePlayer(room, sessionId, index)
    }
  });
}

function safeRemovePlayer(room, sessionId, index) {
  removePlayerFromFollowingChain(room, sessionId, index);
  room.removePlayer(sessionId);
  players.deletePlayer(sessionId);
}

function removePlayerFromFollowingChain(room, sessionId, index) {
  // this player is following the player who is about to leave
  let previousPlayerIndex = mod(index-1, room.getPlayers().length);
  let previousPlayerSessionId = room.getPlayers()[previousPlayerIndex];
  let previousPlayer = players.player(previousPlayerSessionId);
  let toExitPlayer = players.player(sessionId);
  let nextPlayerSessionId = toExitPlayer.getFollowingPlayerSessionId();
  // this branches the gap between the two players around the exit player
  previousPlayer.setFollowingTo(nextPlayerSessionId);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

module.exports = removeExitPlayers;
