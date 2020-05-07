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

  t() {
    return `${this.name}[${this.roomId}]`;
  }

  // following methods
  setFollowingTo(sessionId) {
    this.following = sessionId;
  }

  getFollowingPlayerSessionId() {
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
    this.chain.push(data);
  }

  getChainData() {
    return this.chain;
  }

  moveNewDataToPreviousData() {
    this.previousData = this.newData;
  }

  // ready methods
  setReadyAndRefresh() {
    let room = rooms.room(this.getRoomId());
    if (!this.isReady()) {
      this.setReady();
      if ((room.getState() === values.state.IDEA || room.getState() === values.state.DRAW || room.getState() === values.state.GUESS)
          && this.isConnected()) { // only refresh for waiting states
        this.sendSocketRefresh();
      }
    };
  }

  setReady() {
    this.ready = true;
  }

  setNotReady() {
    this.ready = false;
  }

  isReady() {
    return this.ready;
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

  // name access methods
  getName() {
    return this.name;
  }

  // room id access methods
  getRoomId() {
    return this.roomId;
  }

  // exit methods
  setToExit() {
    this.exit = true;
  }

  isToExit() {
    return this.exit;
  }

  // socket io methods
  sendSocketMessage(event, data) {
    this.socket.emit(event, data);
  }

  sendSocketRefresh() {
    this.sendSocketMessage(values.socket.RELOAD);
  }

  getSocket() {
    return this.socket;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  removeSocket() {
    this.socket = undefined;
  }
}



module.exports = Player;
