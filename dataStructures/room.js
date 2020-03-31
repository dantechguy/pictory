const nextState = require('./nextState');

// classes
class Room {
  constructor(roomId, sendRoomMessageFunction) {
    this.roomId = roomId;
    this.players = [];
    this.state = values.state.LOBBY;
    this.round = 0;
    this.time; // unix timestamp to end of round
    // function passed from socket server init
    this.sendRoomMessage = sendRoomMessageFunction(this.roomId);
    // function for handling changing next state
    this.nextState = nextState;
    // variable for cancelling and setting timeouts for forcing nextState
    this.timeOut;
  }

  // if game is finished method
  gameOver() {
    return this.state === values.state.REPLAY || this.round > values.next.MAX_ROUNDS;
  }

  setState(state) {
    this.state = values.state[state];
  }

  timeLimitHasFinished() {
    return new Date() > this.time;
  }

  // send player ready update
  sendSocketPlayerStatusUpdate() {
    let playerStatusJson = this.generatePlayerStatusJson();
    this.sendRoomMessage(values.socket.UPDATE_PLAYERS, playerStatusJson);
  }

  generatePlayerStatusJson() {
    let statusJson = {};
    this.players.forEach((sessionId) => {
      let playerJson = {
        ready: players.isPlayerReady(sessionId),
        connected: players.isPlayerConnected(sessionId),
      };
      statusJson[players.getPlayerName(sessionId)] = playerJson;
    });

  }

  // getters n helpers
  setAllPlayersNotReady(room) {
    room.players.forEach((sessionId) => {
      players.setPlayerNotReady(sessionId);
    })
  }

  setAllPlayersReady(room) {
    room.players.forEach((sessionId) => {
      players.setPlayerReady(sessionId);
    })
  }

  addPlayerWithSessionId(sessionId) {
    this.players.push(sessionId);
  }

  hasPlayerName(name) {
    return this.players.includes(name);
  }

  getState() {
    return this.state;
  }

  deleteAllPlayers() { // fix so also removes from room, uses function
    this.players.forEach((sessionId) => {
      players.deletePlayer(sessionId);
      this.removePlayer(sessionId);
    });
  }

  removePlayer(sessionId) {
    this.players = this.players.filter((arraySessionId) => {
      return arraySessionId !== sessionId;
    });
  }

  getPlayers() {
    return this.players;
  }

  getDisconnectedPlayers() {
    let disconnectedPlayers = this.players.filter((sessionId) => {
      return players.isPlayerDisconnected(sessionId);
    });
  }

  allPlayersConnected() { // no one is disconnected
    return getDisconnectedPlayers().length === 0;
  }

  allPlayersDisconnected() { // everyone is disconnected
    return getDisconnectedPlayers().length === this.players.length;
  }

  allPlayersAreReadyAndConnected() {
    this.players.forEach((sessionId) => {
      if (player.isNotReady() || player.isDisconnected()) {
        return false;
      }
    });
    return true;
  }
}


module.exports = Room;
