/*

Successful response:
{
  status: "success",
  data: [session id]
}

Unsuccessful response:
{
  status: "error",
  data: [error message]
}

*/

isNameAndRoomIdValid = require('./isNameAndRoomIdValid');


function handleJoinGetRequest(req, res) {
  let data = getDataJsonFromRequest(req);

  if (isNameAndRoomIdValid(data)) {
    nameAndRoomIdSuccess(data, res);
  } else {
    nameAndRoomIdError(data, res);
  };
}

function getDataJsonFromRequest(req) {
  let name = req.query.name;
  let roomId = req.query.roomid;
  let data = {
    name: name,
    roomId: roomId
  }
  return data;
}

function nameAndRoomIdSuccess(data, res) {
  sessionId = tryToCreateRoomAndCreatePlayerAndReturnSessionId(data)
  responseJson = createResponseJson(sessionId);
  res.json(responseJson);
}

function createSuccessResponseJson(sessionId) {
  let responseJson = {
    status: 'success',
    data: sessionId
  }
  return responseJson;
}

function tryToCreateRoomAndCreatePlayerAndReturnSessionId(data) {
  let roomId = data.roomId;
  rooms.tryToCreateRoomWithId(roomId);
  let sessionId = players.createPlayerAndReturnSessionIdWithRoomId(data);
  return sessionId;
}

function nameAndRoomIdError(data, res) {
  
  res.json(responseJson);
}

function createErrorResponseJson(data) {
  let errorMessage = whatIsWrongWithNameAndRoomId(data);
  let responseJson = {
    status: 'error',
    data: 'some error message'
  }
}

module.exports = handleJoinGetRequest;