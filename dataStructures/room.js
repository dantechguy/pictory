const tryToMoveToNextState = require('./nextState');
const deleteRoom = require('./deleteRoom');

// classes
class Room {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = [];
    this.state = values.state.LOBBY;
    this.round = 0;
    this.time; // unix timestamp to end of round
    // function for handling changing next state
    this.tryToMoveToNextState = () => tryToMoveToNextState(this);
    // function for trying to delete room if all players diconnected
    this.deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout = () => deleteRoom.deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout(this);
    this.cancelPreviousDeleteRoomTimeout = () => deleteRoom.cancelPreviousDeleteRoomTimeout(this);
    // variable for following up checks after time
    this.timeouts = {
      forceStateChange: undefined, // kick players who haven't re-connected
      deleteRoom: undefined, // delete room if all players have left
    };
  }

  t() {
    return this.players.reduce((acc, sessionId) => {
      return acc + '  ' + players.player(sessionId).t() + '\n';
    }, '').slice(0, -1);

  }

  // time
  setTimeLimit() {
    this.time = new Date().getTime() + values.time[this.state];
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
  sendSocketMessage(event, data) {
    io.in(this.roomId).emit(event, data)
  }

  sendSocketPlayerStatusUpdate() {
    let playerStatusJson = this.generatePlayersStatusJson();
    this.sendSocketMessage(values.socket.UPDATE_PLAYERS, playerStatusJson);
  }

  generatePlayersStatusJson() {
    let statusJson = {};
    this.players.forEach((sessionId) => {
      let player = players.player(sessionId);
      let playerJson = {
        ready: player.isReady(),
        connected: player.isConnected(),
      };
      statusJson[player.getName()] = playerJson;
    });
    return statusJson;
  }

  // getters n helpers
  getRoomId() {
    return this.roomId;
  }

  setAllPlayersNotReady() {
    this.players.forEach((sessionId) => {
      players.player(sessionId).setNotReady();
    })
  }

  setAllPlayersReadyandFillEmptyData() {
    this.players.forEach((sessionId) => {
      let player = players.player(sessionId);
      if (!player.isReady()) {
        let defaultData = this.getState() === values.state.DRAW ? values.defaultData.draw : values.defaultData.text;
        player.putData(defaultData);
      };
      player.setReadyAndRefresh();
    });
  }

  addPlayerWithSessionId(sessionId) {
    this.players.push(sessionId);
  }

  hasPlayerName(name) {
    for (let i=0; i<this.players.length; i++) {
      let player = players.player(this.players[i]);
      if (name === player.getName()) {
        return true;
      };
    };
    return false;
  }

  getState() {
    return this.state;
  }

  getTimeLimit() {
    return this.time;
  }

  deleteAllPlayers() {
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

  getDisconnectedPlayersWhoAreNotToExit() {
    return this.players.filter((sessionId) => {
      let player = players.player(sessionId);
      return !player.isConnected() && !player.isToExit();
    });
  }

  allPlayersConnectedOrToExit() { // no one is disconnected who wants to continue
    return this.getDisconnectedPlayersWhoAreNotToExit().length === 0;
  }

  getDisconnectedOrToExitPlayers() {
    return this.players.filter((sessionId) => {
      let player = players.player(sessionId);
      return !player.isConnected() || player.isToExit();
    });
  }

  allPlayersDisconnectedOrToExit() { // everyone is disconnected
    return this.getDisconnectedOrToExitPlayers().length === this.players.length;
  }

  allPlayersAreReadyAndConnectedOrToExit() { // toExit players do not count towards 'connected' count
    for (let i=0; i<this.players.length; i++) {
      let sessionId = this.players[i];
      let player = players.player(sessionId);
      if (!player.isReady() || (!player.isConnected() && !player.isToExit()) ) {
        return false;
      }
    }
    return true;
  }

}


module.exports = Room;
