// variables


// classes
class Player {
  constructor(playerJson) {
    this.sessionId = playerJson.sessionId;
    this.name = playerJson.name;
    this.roomId = playerJson.roomId;
    this.socketId;
    this.connected;
    this.following;
  }
}



module.exports = Player;