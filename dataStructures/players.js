

// required files
let Player = require('./player');


// classes
class Players {
  constructor() {
    this.players = {}
  }

  // standard methods
  getPlayer(sessionId) {
    return this.players[sessionId];
  }

  createPlayer(data) {
    let player = new Player(data);
    this.players[data.sessionId] = player;
  }

  deletePlayer(sessionId) {
    delete this.players[sessionId];
  }

  // data access methods
  getPlayerChainData(sessionId) {
    return this.getPlayer(sessionId).getChainData();
  }

  getPlayerData(sessionId) {
    return this.getPlayer(sessionId).getData();
  }

  moveNewDataToPreviousData(sessionId) {
    this.getPlayer(sessionId).moveNewDataToPreviousData();
  }

  // following player access methods
  getFollowingPlayerData(sessionId) {
    return this.getPlayerData(this.getFollowingPlayerSessionId(sessionId));
  }

  getFollowingPlayerSessionId(sessionId) {
    return this.getPlayer(sessionId).getFollowing();
  }

  // room id from player
  getRoomIdFromSessionId(sessionId) {
    let player = this.getPlayer(sessionId);
    return player.roomId;
  }

  // player ready and connection access methods
  isPlayerReady(sessionId) {
    let player = this.getPlayer(sessionId);
    return player.ready;
  }

  setPlayerReady(sessionId) {
    this.getPlayer(sessionId).setReady();
  }

  setPlayerNotReady(sessionId) {
    this.getPlayer(sessionId).setNotReady();
  }

  isPlayerConnected(sessionId) {
    let player = this.getPlayer(sessionId);
    return player.connected;
  }

  isPlayerDisconnected(sessionId) {
    return !this.isPlayerConnected(sessionId);
  }

  getPlayerName(sessionId) {
    return this.getPlayer(sessionId).getName();
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
