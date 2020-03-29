


// required files
let Room = require('./room');


// classes
class Rooms {
  constructor() {
    this.rooms = {};
  }

  addPlayerWithSessionIdToRoomWithId(sessionId, roomId) {
    let room = this.getRoom(roomId);
    room.addPlayerWithSessionId(sessionId);
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
}

module.exports = Rooms;
