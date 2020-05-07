function nameAndRoomIdAreValid() {
  let name = submitData.name;
  let roomId = submitData.roomId;
  return nameIsValid(name) && roomIdIsValid(roomId);
}

function nameIsValid(name) {
  return /^[a-zA-Z]{3,8}$/.test(name);
}

function roomIdIsValid(roomId) {
  return /^[0-9]{4}$/.test(roomId);
}

function whatIsWrongWithNameAndRoomId(submitData) {
  let whatIsWrongList = generateListOfWhatIsWrongWithNameAndRoomId(submitData);
  let whatIsWrongText = whatIsWrongList.join(' ');
  return whatIsWrongText;
}

function generateListOfWhatIsWrongWithNameAndRoomId(submitData) {
  let whatIsWrongList = [];
  if (!nameIsValid(submitData.name)) {
    whatIsWrongList.push(values.error.INVALID_NAME);
  };
  if (!roomIdIsValid(submitData.roomId)) {
    whatIsWrongList.push(values.error.INVALID_ROOM_ID);
  }
  return whatIsWrongList;
}
