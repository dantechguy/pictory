

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
}