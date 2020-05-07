

// required files
let Player = require('./player');


// classes
class Players {
  constructor() {
    this.players = {}
  }

  // standard methods
  player(sessionId) {
    return this.players[sessionId];
  }

  createPlayer(data) {
    let player = new Player(data);
    this.players[data.sessionId] = player;
  }

  deletePlayer(sessionId) {
    delete this.players[sessionId];
  }

  // session id generation
  createPlayerReturnSessionId(data) {
    let sessionId = this.createNewUniqueSessionId();
    data.sessionId = sessionId;
    this.createPlayer(data);
    rooms.room(data.roomId).addPlayerWithSessionId(data.sessionId);
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
