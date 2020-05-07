const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateDataJson = responseFunctions.dataJson;
const generateErrorList = require('./generateErrorList');


function handleJoinPostRequest(req, res) {
  let data = generateDataJson(req);
  let errorsToCheck = ['ROOM_ENDED'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  };
}

function requestSuccess(data, res) {
  let player = players.player(data.sessionId);
  player.setReady();
  player.setToExit();
  l(player.t(), 'to exit')
  responseJson = {status: 'success'};
  res.cookie(values.cookie.SESSION_ID_KEY, sessionId, {httpOnly: true}); // , secure: true
  res.json(responseJson);
  rooms.room(data.roomId).deleteRoomIfAllPlayersDisconnectedOrToExitAfterTimeout();
}

module.exports = handleJoinPostRequest;
