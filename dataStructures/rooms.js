// required files
const Room = require('./room');
const forceTimeLimit = require('./forceTimeLimit');

// classes
class Rooms {
  constructor() {
    this.rooms = {};
  }

  room(roomId) {
    return this.rooms[roomId];
  }

  deleteRoom(roomId) { // all players have disconnected
    let room = this.room(roomId);
    room.deleteAllPlayers();
    forceTimeLimit.cancelPreviousForceNextStateTimeout(room);
    delete this.rooms[roomId];
  }

  createRoom(roomId) {
    let room = new Room(roomId);
    this.rooms[roomId] = room;
  }

  roomExists(roomId) {
    return this.rooms.hasOwnProperty(roomId);
  }
}

module.exports = Rooms;
