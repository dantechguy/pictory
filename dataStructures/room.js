

// classes
class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = [];
    this.state = 'lobby';
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
}


module.exports = Room;