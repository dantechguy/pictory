function nameAndRoomIdErrorList(data) {
  let name = data.name;
  let roomId = data.roomId;

  let listOfErrors = [];
  if (nameIsValid(name)) {listOfErrors.push(values.error.NAME)};
  if (roomIdIsValid(roomId)) {listOfErrors.push(values.error.ROOM_ID)};
  if (roomHasStarted(roomId)) {listOfErrors.push(values.error.ROOM_STARTED)};
  if (nameIsTaken(data)) {listOfErrors.push(values.error.ROOM_ID)};

  return listOfErrors;
}


// tests
function nameIsInvalid(name) {
  return /^[a-zA-Z]{3,8}$/.test(name);
}

function roomIdIsInvalid(roomId) {
  return /^[0-9]{4}$/.test(roomId);
}

function roomHasStarted(roomId) {
  let roomExists = rooms.roomExists(roomId);
  let roomStarted = roomExists && rooms.getRoomState(roomId) !== values.state.LOBBY;
  return roomStarted;
}

function nameIsTaken(data) {
  let roomId = data.roomId;
  let name = data.name;
  let roomExists = rooms.roomExists(roomId);
  let nameTaken = roomExists && rooms.getRoom(roomId).hasPlayerName(name);
  return nameTaken;
}

module.exports = nameAndRoomIdErrorList;
