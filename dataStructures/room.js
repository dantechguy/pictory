const state = {
  LOBBY: 0,
  IDEA: 1,
  DRAWING: 2,
  GUESS: 3,
  REPLAY: 4
}


// classes
class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = [];
    this.state = state.LOBBY;
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

  doesntHavePlayerName(name) {
    return !this.hasPlayerName(name);
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

  switchToNextState() {
    switch (this.state) {

      case state.LOBBY:
        this.state = state.IDEA;
        break;

      case state.IDEA:
        this.state = state.DRAWING;
        break;

      case state.DRAWING:
        this.state = state.GUESS;
        break;

      case state.GUESS:
        this.state = state.DRAWING;
        break;
    }
  }
}


module.exports = Room;
