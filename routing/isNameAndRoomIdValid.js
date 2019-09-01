// variables
let lobbyStateText = 'lobby';
let roomIdErrorMessage = 'Your room ID must be 4 numbers.';
let nameErrorMessage = 'Your name must be 3 to 8 characters long, and only include lowercase and uppercase letters.';
let roomHasStartedErrorMessage = 'This game has already started.';
let nameIsTakenErrorMessage = 'This name has already been used in this room.';

/*
WHAT TO CHECK FOR:
- room id is valid
- room doesnt exist, or is in lobby state
- name is valid
- name isnt taken in room
*/

function generateWhatIsWrongWithNameAndRoomIdErrorMessage(data) {
  let whatIsWrongList = generateWhatIsWrongList(data);
  let whatIsWrongText = whatIsWrongList.join(' ');
  return whatIsWrongText;
}

function generateWhatIsWrongList(data) {
  let name = data.name;
  let roomId = data.roomId;
  let whatIsWrongList = [];

  if (!roomIdIsValid(roomId)) {
    whatIsWrongList.push(roomIdErrorMessage);
  };
  if (!nameIsValid(name)) {
    whatIsWrongList.push(nameErrorMessage);
  };
  if (!roomDoesntExistOrIsInLobbyState(roomId)) {
    whatIsWrongList.push(roomHasStartedErrorMessage);
  };
  if (!ifRoomIsInLobbyStateThenNameIsntTaken(data)) {
    whatIsWrongList.push(nameIsTakenErrorMessage);
  };
  return whatIsWrongList;
}

function isNameAndRoomIdValid(data) {
  let name = data.name;
  let roomId = data.roomId;

  return roomIdIsValid(roomId) &&
    nameIsValid(name) &&
    roomDoesntExistOrIsInLobbyState(roomId) &&
    ifRoomIsInLobbyStateThenNameIsntTaken(data);

}

function nameIsValid(name) {
  return /^[a-zA-Z]{3,8}$/.test(name);
}

function roomIdIsValid(roomId) {
  return /^[0-9]{4}$/.test(roomId);
}

function roomDoesntExistOrIsInLobbyState(roomId) {
  let roomDoesntExist = rooms.roomDoesntExistWithId(roomId);
  let roomIsInLobbyState = rooms.roomWithIdIsInState(roomId, lobbyStateText);
  return roomDoesntExist || roomIsInLobbyState;
}

function ifRoomIsInLobbyStateThenNameIsntTaken(data) {
  let roomId = data.roomId;
  let name = data.name;
  let roomIsInLobbyState = rooms.roomWithIdIsInState(roomId, lobbyStateText);
  let nameIsntTaken = rooms.roomWithIdDoesntHaveName(name);
  if (roomIsInLobbyState) {
    return nameIsntTaken;
  } else {
    return true;
  }
}

module.exports = isNameAndRoomIdValid;