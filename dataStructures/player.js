// variables


// classes
class Player {
  constructor(data) {
    this.sessionId = data.sessionId;
    this.name = data.name;
    this.roomId = data.roomId;
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
