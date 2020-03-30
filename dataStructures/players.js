

// required files
let Player = require('./player');


// classes
class Players {
  constructor() {
    this.players = {}
  }

  getPlayer(sessionId) {
    return this.players[sessionId];
  }

  getFollowingPlayerSessionId(sessionId) {
    return this.getPlayer(sessionId).getFollowing();
  }

  getFollowingPlayer(sessionId) {
    return this.getPlayer(getFollowingPlayerSessionId(sessionId));
  }

  getFollowingPlayerData(sessionId) {
    return getFollowingPlayer(sessionId).getData();
  }

  getRoomIdFromSessionId(sessionId) {
    let player = this.getPlayer(sessionId);
    return player.roomId;
  }

  isPlayerReady(sessionId) {
    let player = this.getPlayer(sessionId);
    return player.ready;
  }

  isPlayerConnected(sessionId) {
    let player = this.getPlayer(sessionId);
    return player.connected;
  }

  isPlayerDisconnected(sessionId) {
    return !this.isPlayerConnected(sessionId);
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
