const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateDataJson = responseFunctions.dataJson;
const generateErrorList = require('./generateErrorList');


function handleDataPutRequest(req, res) {
  let data = generateDataJson(req);
  let errorsToCheck = ['ROOM_NOT_STARTED', 'PLAYER_READY']; // session id check already done in routing
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  }
}

function requestSuccess(data, res) {
  let player = players.getPlayer(data.sessionId);
  player.putData(data.data); // prompt data
  player.setToReady(); // set player to ready
  let responseJson = createResponseJson('success', '');
  res.json(responseJson);
}

module.exports = handleDataPutRequest;
