// variables


// classes
class Player {
  constructor(playerJson) {
    this.sessionId = playerJson.sessionId;
    this.name = playerJson.name;
    this.roomId = playerJson.roomId;
    this.socket;
    this.connected;
    this.following;
    this.ready;
  }
}



module.exports = Player;