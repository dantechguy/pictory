

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

  createPlayer(playerRequestJson) {
    let sessionId = playerRequestJson.sessionId;
    let player = new Player(playerRequestJson);
    this.players[sessionId] = player;
  }

  createPlayerAndReturnSessionIdWithRoomId(playerRequestJson) {
    let roomId = playerRequestJson.roomId;
    let sessionId = this.createNewUniqueSessionId();
    playerRequestJson.sessionId = sessionId;
    rooms.addPlayerWithSessionIdToRoomWithId(sessionId, roomId);
    this.createPlayer(playerRequestJson);
    return sessionId;
  }

  createNewUniqueSessionId() {
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

  sessionIdDoesntExist(sessionId) {
    return !this.sessionIdExists(sessionId);
  }
}



module.exports = Players;