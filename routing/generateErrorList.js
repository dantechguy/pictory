// needs to be defined here, as references local functions
const errorToFunction = {
  'INVALID_NAME': nameIsInvalid,
  'INVALID_ROOM_ID': roomIdIsInvalid,
  'ROOM_STARTED': roomHasStarted,
  'NAME_TAKEN': nameIsTaken,
  'INVALID_SESSION_ID': sessionIdIsInvalid,
  'PLAYER_CONNECTED': playerIsAlreadyConnected,
  'ROOM_NOT_STARTED': roomHasNotStarted,
  'PLAYER_READY': playerIsAlreadyReady,
  'ROOM_ENDED': roomHasEnded,
  'TIME_LIMIT': timeLimitHasFinished,
}

function generateErrorList(errorList, data) {
  let listOfErrors = errorList.filter(removeNonErrors(data)).map(addErrorName);
  return listOfErrors;
}

// remove errors which are invalid or do not occur from array
function removeNonErrors(data) { // to pass data parameter
  return (errorName) => { // return a function which applies filter
    let errorIsValid = values.error.hasOwnProperty(errorName);
    let errorOccurs = errorIsValid && errorToFunction[errorName](data);
    return errorOccurs;
  }
}

// convert error names to error messages
function addErrorName(errorName) {
  return values.error[errorName];
}


// tests
function nameIsInvalid(data) {
  return !values.regex.NAME.test(data.name);
}

function roomIdIsInvalid(data) {
  return !values.regex.ROOM_ID.test(data.roomId);
}

function roomHasStarted(data) {
  let roomExists = rooms.roomExists(data.roomId);
  let roomStarted = roomExists && rooms.getRoomState(data.roomId) !== values.state.LOBBY;
  return roomStarted;
}

function nameIsTaken(data) {
  let roomExists = rooms.roomExists(data.roomId);
  let nameTaken = roomExists && rooms.getRoom(data.roomId).hasPlayerName(data.name);
  return nameTaken;
}

function sessionIdIsInvalid(data) {
  let sessionIdValid = values.regex.SESSION_ID.test(data.sessionId);
  let sessionIdExists = sessionIdValid && players.sessionIdExists(data.sessionId);
  let sessionIdDoesntExist = !sessionIdExists;
  return sessionIdDoesntExist;
}

function playerIsAlreadyConnected(data) {
  let playerIsConnected = players.isPlayerConnected(data.sessionId);
  return playerIsConnected;
}

function roomHasNotStarted(data) {
  return !roomHasStarted(data);
}

function playerIsAlreadyReady(data) {
  let playerIsReady = players.isPlayerReady(data.sessionId);
  return playerIsReady;
}

function roomHasEnded(data) {
  let roomExists = rooms.roomExists(data.roomId);
  let roomEnded = roomExists && rooms.getRoomState(data.roomId) !== values.state.REPLAY;
  return roomEnded;
}

function timeLimitHasFinished(data) {
  return rooms.getRoom(data.roomId).timeLimitHasFinished();
}

module.exports = generateErrorList;
