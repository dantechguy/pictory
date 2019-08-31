


// required files
let Room = require('./room');


// classes
class Rooms {
  constructor() {
    this.rooms = {};
  }

  addPlayerWithSessionIdToRoomWithId(sessionId, roomId) {
    let room = this.getRoomWithId(roomId);
    room.addPlayerWithSessionId(sessionId);
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

  tryToCreateRoomWithId(roomId) {
    if (this.roomDoesntExistWithId(roomId)) {
      this.createRoomWithId(roomId);
    }
  }

  roomExistsWithId(roomId) {
    return this.rooms.hasOwnProperty(roomId);
  }

  roomDoesntExistWithId(roomId) {
    return !this.roomExistsWithId(roomId);
  }

  roomWithIdIsInState(roomId, state) {
    if (this.roomExistsWithId(roomId)) {
      let room = this.getRoomWithId(roomId);
      let roomState = room.state;
      return roomState === state;
    } else {
      return true;
    }
  }

  roomWithIdDoesntHaveName(roomId, name) {
    if (this.roomExistsWithId(roomId)) {
      let room = this.getRoomWithId(roomId);
      return room.doesntHavePlayerName(name);
    } else {
      return true;
    }
  }
}

module.exports = Rooms;