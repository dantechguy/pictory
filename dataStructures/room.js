

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

  hasPlayerName(name) {
    return this.players.includes(name);
  }

  doesntHavePlayerName(name) {
    return !this.hasPlayerName(name);
  }
}