// variables
let lobbyStateText = 'lobby';


/*
WHAT TO CHECK FOR:
- room id is valid
- room doesnt exist, or is in lobby state
- name is valid
- name isnt taken in room
*/

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
  let roomIsInLobbyState = rooms.roomWithIdIsInStateOrDoesntExist(roomId, lobbyStateText);
  return roomDoesntExist || roomIsInLobbyState;
}

function ifRoomIsInLobbyStateThenNameIsntTaken(data) {
  let roomId = data.roomId;
  let name = data.name;
  let roomIsInLobbyState = rooms.roomWithIdIsInStateOrDoesntExist(roomId, lobbyStateText);
  let nameIsntTaken = rooms.roomWithIdDoesntHaveNameOrDoesntExist(name);
  if (roomIsInLobbyState) {
    return nameIsntTaken;
  } else {
    return true;
  }
}

module.exports = isNameAndRoomIdValid;