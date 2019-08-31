

// required files
let Player = require('./player');


// classes
class Players {
  constructor() {
    this.players = {} 
  }

  createPlayer(playerRequestJson) {
    let sessionId = playerRequestJson.sessionId;
    let player = new Player(playerRequestJson);
    this.players[sessionId] = player;
  }

  createPlayerAndReturnSessionIdWithRoomId(playerRequestJson) {r
    let roomId = playerRequestJson.roomId;
    let name = playerRequestJson.name;
    let sessionId = createNewUniqueSessionId();
    let playerRequestJson.sessionId = sessionId;
    rooms.addPlayerWithSessionIdToRoomWithId(sessionId, roomId);
    this.createPlayer(playerRequestJson);
  }

  createNewUniqueSessionId() {
    let sessionId = generateSessionId();
    while (this.sessionIdExists(sessionId)) {
      sessionId = generateSessionId();
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