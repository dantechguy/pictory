

// required files
let Player = require('./player');


// classes
class Players {
  constructor() {
    this.players = {}
  }

  getPlayerWithId(sessionId) {
    return this.players[sessionId];
  }

  getRoomIdFromSessionId(sessionId) {
    let player = this.getPlayerWithId(sessionId);
    let roomId = player.roomId;
    return roomId;
  }

  isConnected(sessionId) {
    let player = this.getPlayerWithId(sessionId);
    let connected = player.connected;
    return connected;
  }

  isDisconnected(sessionId) {
    return !this.isConnected(sessionId);
  }

  createPlayer(data) {
    let player = new Player(data);
    this.players[data.sessionId] = player;
  }

  // session id generation
  createPlayerReturnSessionId(data) {
    let sessionId = this.createNewUniqueSessionId();
    data.sessionId = sessionId;
    rooms.addPlayerToRoom(data);
    this.createPlayer(data);
    return sessionId;
  }

  createNewUniqueSessionId() { // not ideal
    let sessionId = this.generateSessionId();
    while (this.sessionIdExists(sessionId)) {
      sessionId = this.generateSessionId();
    };
    return sessionId;
  }

  generateSessionId() {
    let sessionIdText = "";
    for (let i=0; i<10; i++) {
      let randomInt = Math.floor(Math.random()*10);
      sessionIdText += randomInt;
    };
    let sessionId = parseInt(sessionIdText);
    return sessionId;
  }

  sessionIdExists(sessionId) {
    return this.players.hasOwnProperty(sessionId);
  }
}



module.exports = Players;
