// classes
class Room {
  constructor(roomId, sendRoomMessageFunction) {
    this.roomId = roomId;
    this.players = [];
    this.state = values.state.LOBBY;
    this.round = 0;
    this.time; // UTC timestamp to end of round
    // function passed from socket server init
    this.sendRoomMessage = sendRoomMessageFunction(this.roomId);
  }

  // state functions
  nextState() { // next state main function call
    if (this.state === values.state.LOBBY) {
      this.assignFollowChain();
    }
    this.moveAllPlayerDataToTargetPlayerChain();
    this.moveAllNewPlayerDataToPreviousData();
    this.setAllPlayersNotReady();
    if (this.gameOver()) {
      this.changeToReplayState();
    } else {
      this.changeToNextState();
      this.round++;
    }
    sendSocketReloadMessage();
  }

  // setting up follow chain
  assignFollowChain() {
    let player, followPlayerIndex, followPlayerSessionId;
    this.shufflePlayers();
    this.players.forEach( (sessionId, index) => {
      player = players.getPlayer(sessionId);
      followPlayerIndex = (index+1) % this.players.length;
      followPlayerSessionId = this.players[followPlayerIndex];
      player.setFollowing(followPlayerSessionId);
    })
  }

  shufflePlayers() {
    for (let i = this.players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
  }

  // move new player data to target players chain
  moveAllPlayerDataToTargetPlayerChain() {
    this.players.forEach(this.moveAllPlayerDataToTargetPlayerChain);
  }

  movePlayerDataTargetPlayerChain(sessionId, index) {
    let data = players.getPlayerData(sessionId);
    let targetPlayerIndex = (index + this.round) % this.players.length;
    let targetPlayerSessionId = this.players[targetPlayerIndex];
    players.getPlayer(targetPlayerSessionId).putChainData(data);
  }

  // move new data to previous data method
  moveAllNewPlayerDataToPreviousData() {
    this.players.forEach((sessionId) => {
      players.moveNewDataToPreviousData(sessionId);
    })
  }

  // set all players not ready method
  setAllPlayersNotReady() {
    this.players.forEach((sessionId) => {
      players.setPlayerNotReady(sessionId);
    })
  }

  // if game is finished method
  gameOver() {
    return this.state === values.state.REPLAY || this.round > values.next.MAX_ROUNDS;
  }

  // next state methods
  changeToReplayState() {
    this.setState(values.state.REPLAY);
  }

  changeToNextState() {
    this.setState(values.next[this.state]);
  }

  setState(state) {
    this.state = values.state[state];
  }

  sendSocketReloadMessage() {
    this.sendRoomMessage(values.socket.RELOAD);
  }

  // send player ready update
  sendSocketPlayerReadyUpdate() {
    let playerReadyJson = this.generatePlayerReadyJson();
    this.sendRoomMessage(values.socket.UPDATE_PLAYERS, readyJson);
  }

  generatePlayerReadyJson() {
    let readyJson = {};
    this.players.forEach((sessionId) => {
      readyJson[players.getPlayerName(sessionId)] = players.isPlayerReady(sessionId);
    });

  }

  // getters n helpers
  addPlayerWithSessionId(sessionId) {
    this.players.push(sessionId);
  }

  hasPlayerName(name) {
    return this.players.includes(name);
  }

  deleteAllPlayers() {
    this.players.forEach( (sessionId) => {
      players.deletePlayer(sessionId);
    });
  }

  allPlayersDisconnected() {
    this.players.forEach( (sessionId) => {
      if (player.isConnected()) {
        return false;
      }
    });
    return true;
  }

  allPlayersAreReadyAndConnected() {
    this.players.forEach( (sessionId) => {
      if (player.isNotReady() || player.isDisconnected()) {
        return false;
      }
    });
    return true;
  }
}


module.exports = Room;
