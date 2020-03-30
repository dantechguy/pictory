


// required files
let Room = require('./room');


// classes
class Rooms {
  constructor() {
    this.rooms = {};
  }

  addPlayerToRoom(data) {
    let room = this.getRoom(data.roomId);
    room.addPlayerWithSessionId(data.sessionId);
  }

  getRoom(roomId) {
    return this.rooms[roomId];
  }

  deleteRoom(roomId) {
    delete this.rooms[roomId];
  }

  createRoom(roomId) {
    let room = new Room(roomId);
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
