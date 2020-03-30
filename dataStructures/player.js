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

  setFollowingTo(sessionId) {
    this.following = sessionId;
  }

  getFollowing() {
    return this.following;
  }

  putData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setToReady() {
    this.ready = true;
  }

  setToNotReady() {
    this.ready = false;
  }

  setConnected() {
    this.connected = true;
  }

  setDisconnected() {
    this.connected = false;
  }

  isConnected() {
    return this.connected;
  }

  isDisconnected() {
    return !this.isConnected();
  }

  isReady() {
    return this.ready;
  }

  isNotReady() {
    return !this.isReady();
  }
}



module.exports = Player;
