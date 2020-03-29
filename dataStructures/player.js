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
    this.chain;
    this.data;
  }

  setToReady() {
    this.ready = true;
  }

  setToNotReady() {
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  isNotReady() {
    return !this.isReady();
  }
}



module.exports = Player;
