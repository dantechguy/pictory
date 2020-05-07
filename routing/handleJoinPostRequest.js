const responseFunctions = require('./responseFunctions');
// const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateErrorList = require('./generateErrorList');


function handleJoinPostRequest(req, res) {
  let data = req.body.data; // dont use generateDataJson since this has 'name' and 'roomId' attributes
  let errorsToCheck = ['NAME_TAKEN', 'INVALID_NAME', 'INVALID_ROOM_ID', 'ROOM_STARTED'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  };
}

function requestSuccess(data, res) {
  if (!rooms.roomExists(data.roomId)) {
    rooms.createRoom(data.roomId);
  };
  sessionId = players.createPlayerReturnSessionId(data);
  responseJson = {status: 'success'};
  l(players.player(data.sessionId).t());
  let room = rooms.room(data.roomId);
  room.sendSocketPlayerStatusUpdate();
  room.deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout();
  res.cookie(values.cookie.SESSION_ID_KEY, sessionId, {httpOnly: true}); // , secure: true
  res.json(responseJson);
}

module.exports = handleJoinPostRequest;
