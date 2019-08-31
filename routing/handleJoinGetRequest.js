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
    nameAndRoomIdError(res);
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
  sessionId = tryToCreateRoomAndCreateProfileAndReturnSessionId(data)
  responseJson = createResponseJson(sessionId);
  res.json(responseJson);
}

function createResponseJson(sessionId) {
  responseJson = {
    status: 'success',
    data: sessionId
  }
  return responseJson;
}

function tryToCreateRoomAndCreateProfileAndReturnSessionId(data) {
  let roomId = data.roomId;
  rooms.tryToCreateRoomWithId(roomId);
  let sessionId = players.createNewProfileAndReturnSessionIdWithRoomId(roomId);
}

function nameAndRoomIdError(res) {
  let responseJson = {
    status: 'error',
    data: 'some error message'
  }
  res.json(responseJson);
}

module.exports = handleJoinGetRequest;