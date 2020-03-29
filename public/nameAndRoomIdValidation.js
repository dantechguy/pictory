function nameAndRoomIdAreValid(data) {
  let name = data.name;
  let roomId = data.roomId;
  return nameIsValid(name) && roomIdIsValid(roomId);
}

function nameIsValid(name) {
  return /^[a-zA-Z]{3,8}$/.test(name);
}

function roomIdIsValid(roomId) {
  return /^[0-9]{4}$/.test(roomId);
}

function whatIsWrongWithNameAndRoomId(data) {
  let whatIsWrongList = generateListOfWhatIsWrongWithNameAndRoomId(data);
  let whatIsWrongText = whatIsWrongList.join(' ');
  return whatIsWrongText;
}

function generateListOfWhatIsWrongWithNameAndRoomId(data) {
  let whatIsWrongList = [];
  if (!nameIsValid(data.name)) {
    whatIsWrongList.push(values.error.NAME);
  };
  if (!roomIdIsValid(data.roomId)) {
    whatIsWrongList.push(values.error.ROOM_ID);
  }
  return whatIsWrongList;
}
