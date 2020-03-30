


// required files
let Room = require('./room');


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
    if (allPlayersDisconnected(roomId)) {
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
    if (this.allPlayersAreReadyAndConnected(roomId)) {
      this.moveToNextState(roomId);
    }
  }

  sendSocketPlayerReadyUpdate(roomId) {
    this.getRoom(roomId).sendSocketPlayerReadyUpdate();
  }

  moveToNextState(roomId) {
    this.getRoom(roomId).nextState();
  }

  allPlayersAreReadyAndConnected(roomId) {
    let room = this.getRoom(roomId);
    return room.allPlayersAreReadyAndConnected();
  }

  deleteRoom(roomId) {
    this.deleteAllPlayers(roomId)
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
