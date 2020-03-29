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
  rooms.createRoom(data.roomId);
  sessionId = players.createPlayerReturnSessionId(data);
  responseJson = createResponseJson('success', '');
  res.cookie(values.cookie.SESSION_ID_KEY, sessionId, {httpOnly: true, secure: true});
  res.json(responseJson);
}

// error
function nameAndRoomIdError(data, res) {
  let responseJson = createResponseJson('error', data.join(' ')); // joins together error strings
  res.status(401);
  res.json(responseJson);
}

module.exports = handleJoinGetRequest;
