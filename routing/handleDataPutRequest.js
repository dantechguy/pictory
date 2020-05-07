const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateDataJson = responseFunctions.dataJson;
const generateErrorList = require('./generateErrorList');


function handleDataPutRequest(req, res) {
  let data = generateDataJson(req);
  let errorsToCheck = ['PLAYER_READY', 'ROOM_ENDED', 'TIME_LIMIT']; // session id check already done in routing
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  }
}

function requestSuccess(data, res) { // refresh player so game can give 'wait' page
  let player = players.player(data.sessionId);
  player.putData(data.data.prompt); // prompt data
  player.setReadyAndRefresh();
  l(player.t(), 'ready');
  let responseJson = {status: 'success'};
  res.json(responseJson);
  let room = rooms.room(data.roomId);
  room.sendSocketPlayerStatusUpdate();
  room.tryToMoveToNextState();
}

module.exports = handleDataPutRequest;
