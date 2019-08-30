


// required files
let Room = require('./room');


// classes
class Rooms {
  constructor() {
    this.rooms = {};
  }

  getRoomWithId(roomId) {
    return this.rooms[roomId];
  }

  deleteRoomWithId(roomId) {
    delete this.rooms[roomId];
  }

  createRoomWithId(roomId) {
    let room = new Room(roomId);
    this.rooms[roomId] = room;
  }
}

module.exports = Rooms;