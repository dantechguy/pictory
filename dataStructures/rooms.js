// required files
const Room = require('./room');
const stateTime = require('./stateTime');

// classes
class Rooms {
  constructor(sendRoomMessageFunction) {
    this.sendRoomMessageFunction = sendRoomMessageFunction;
    this.rooms = {};
  }

  getRoom(roomId) {
    return this.rooms[roomId];
  }

  deleteRoomIfAllPlayersDisconnected(roomId) {
    if (this.allPlayersDisconnected(roomId)) {
      l('deleting room', roomId)
      this.deleteRoom(roomId);
    }
  }

  allPlayersDisconnected(roomId) {
    return this.getRoom(roomId).allPlayersDisconnected();
  }

  addPlayerToRoom(data) {
    let room = this.getRoom(data.roomId);
    room.addPlayerWithSessionId(data.sessionId);
  }

  tryToMoveToNextState(roomId) {
    if (this.allPlayersAreReadyAndConnectedOrToExit(roomId)) {
      l('all players ready')
      this.moveToNextState(roomId);
    }
  }

  sendSocketPlayerStatusUpdate(roomId) {
    this.getRoom(roomId).sendSocketPlayerStatusUpdate();
  }

  moveToNextState(roomId) {
    this.getRoom(roomId).nextState();
  }

  allPlayersAreReadyAndConnectedOrToExit(roomId) {
    let room = this.getRoom(roomId);
    return room.allPlayersAreReadyAndConnectedOrToExit();
  }

  deleteRoom(roomId) { // all players have disconnected
    this.deleteAllPlayers(roomId);
    stateTime.cancelPreviousTimeouts(this.getRoom(roomId));
    delete this.rooms[roomId];
  }

  deleteAllPlayers(roomId) {
    this.getRoom(roomId).deleteAllPlayers();
  }

  createRoom(roomId) {
    let room = new Room(roomId, sendRoomMessageFunction);
    this.rooms[roomId] = room;
  }

  roomExists(roomId) {
    return this.rooms.hasOwnProperty(roomId);
  }

  getRoomState(roomId) {
    let room = this.getRoom(roomId);
    let roomState = room.state;
    return roomState;
  }

  getRoomTime(roomId) {
    let room = this.getRoom(roomId);
    let roomTime = room.time;
    return roomTime;
  }
}

module.exports = Rooms;
