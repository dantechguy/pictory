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

  startGame() {
    this.assignFollowChain();
    this.nextState();
  }

  // setting up follow chain
  assignFollowChain() {
    this.shufflePlayers();
    this.players.forEach( (sessionId, index) => {
      let player = players.getPlayer(sessionId);
      let followPlayerIndex = (index+1) % this.players.length;
      let followPlayerSessionId = this.players[followPlayerIndex];
      player.setFollowing(followPlayerSessionId);
    })
  }

  shufflePlayers() {
    for (let i = this.players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
  }

  // state functions
  nextState() {
    this.setState(values.next[this.state]);
  }

  setState(state) {
    this.state = values.state[state];
  }

  sendSocketReloadMessage() {
    
  }

  // getters n helpers

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
      player = players.getPlayer(sessionId);
      if (player.isNotReady()) {
        return false;
      }
    }
    return true;
  }
}


module.exports = Room;
