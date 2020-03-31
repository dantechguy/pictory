// variables


// classes
class Player {
  constructor(data) {
    this.sessionId = data.sessionId;
    this.name = data.name;
    this.roomId = data.roomId;
    this.socket;
    this.connected = false;
    this.following;
    this.ready = false;
    this.chain = [];
    this.newData;
    this.previousData;
    this.exit = false;
  }

  // following methods
  setFollowingTo(sessionId) {
    this.following = sessionId;
  }

  getFollowing() {
    return this.following;
  }

  // data methods
  putData(data) {
    this.newData = data;
  }

  getData() {
    return this.previousData;
  }

  putChainData(data) {
    this.chainData.push(data);
  }

  getChainData() {
    return this.chain;
  }

  moveNewDataToPreviousData() {
    this.previousData = newData;
  }

  // ready methods
  setReady() {
    this.ready = true;
  }

  setNotReady() {
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  isNotReady() {
    return !this.isReady();
  }

  // connected methods
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

  // name access methods
  getName() {
    return this.name;
  }

  // exit methods
  setToExit() {
    this.exit = true;
  }

  isToExit() {
    return this.exit;
  }
}



module.exports = Player;
