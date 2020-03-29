// classes
class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = [];
    this.state = values.state.LOBBY;
    this.round = 0;
    this.time; // UTC timestamp to end of round
    /* state can be:
    lobby
    idea
    drawing
    guess
    replay
    */
  }

  addPlayerWithSessionId(sessionId) {
    this.players.push(sessionId);
  }

  hasPlayerName(name) {
    return this.players.includes(name);
  }

  allPlayersAreReady() {
    let sessionId, player;
    for (let i = 0; i < this.players.length; i++) {
      sessionId = this.players[i];
      player = players.getPlayerWithId(sessionId);
      if (player.isNotReady()) {
        return false;
      }
    }
    return true;
  }
}


module.exports = Room;
