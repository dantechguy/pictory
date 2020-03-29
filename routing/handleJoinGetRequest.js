let isNameAndRoomIdValid = require('./nameAndRoomIdErrorList');
let whatIsWrongWithNameAndRoomId = require('./whatIsWrongWithNameAndRoomId');
let createResponseJson = require('./createResponseJson');


function handleJoinGetRequest(req, res) {
  let listOfNameAndRoomIdErrors = nameAndRoomIdErrorList(req.body);
  let noNameAndRoomIdErrors = listOfNameAndRoomIdErrors.length === 0;

  if (noNameAndRoomIdErrors) {
    nameAndRoomIdSuccess(data, res);
  } else {
    nameAndRoomIdError(listOfNameAndRoomIdErrors);
  };
}

// success
function nameAndRoomIdSuccess(data, res) {
  sessionId = createRoomAndCreatePlayerAndReturnSessionId(data)
  responseJson = createSuccessResponseJson(sessionId);
  res.json(responseJson);
}

function createSuccessResponseJson(sessionId) {
  return createResponseJson('success', sessionId);
}

function createRoomAndCreatePlayerAndReturnSessionId(data) {
  let roomId = data.roomId;
  rooms.createRoom(roomId);
  let sessionId = players.createPlayerAndReturnSessionIdWithRoomId(data);
  return sessionId;
}

// error
function nameAndRoomIdError(data, res) {
  let responseJson = createResponseJson('error', data.join(" ")); // joins together error strings
  res.status(401);
  res.json(responseJson);
}

module.exports = handleJoinGetRequest;
