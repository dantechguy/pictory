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

let isNameAndRoomIdValid = require('./isNameAndRoomIdValid');
let whatIsWrongWithNameAndRoomId = require('./whatIsWrongWithNameAndRoomId');


function handleJoinGetRequest(req, res) {
  let data = getDataJsonFromRequest(req);

  if (isNameAndRoomIdValid(data)) {
    nameAndRoomIdSuccess(data, res);
  } else {
    nameAndRoomIdError(data, res);
  };
}

function getDataJsonFromRequest(req) {
  // let name = req.query.name;
  // let roomId = req.query.roomid;
  let jsonBody = JSON.parse(req.body);
  let name = jsonBody.name;
  let roomId = jsonBody.roomId;
  let data = {
    name: name,
    roomId: roomId
  }
  return data;
}

function nameAndRoomIdSuccess(data, res) {
  sessionId = tryToCreateRoomAndCreatePlayerAndReturnSessionId(data)
  responseJson = createSuccessResponseJson(sessionId);
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
  let responseJson = createErrorResponseJson(data);
  res.json(responseJson);
}

function createErrorResponseJson(data) {
  let errorMessage = whatIsWrongWithNameAndRoomId(data);
  let responseJson = {
    status: 'error',
    data: errorMessage
  }
  return responseJson;
}

module.exports = handleJoinGetRequest;
