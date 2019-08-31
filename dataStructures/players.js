


// classes
class Players {
  constructor() {
    this.players = {} 
  }

  createNewProfileAndReturnSessionIdWithRoomId(roomId) {
    createNewSessionId();
  }

  createNewSessionId() {
    let session
  }

  sessionIdExists(sessionId) {
    return this.players.hasOwnProperty(sessionId);
  }

  sessionIdDoesntExist(sessionId) {
    return !this.sessionIdExists(sessionId);
  }
}



module.exports = Players;