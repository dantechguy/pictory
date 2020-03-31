// required files
const path = require('path');
const generateErrorList = require('./generateErrorList');
const responseFunctions = require('./responseFunctions');
const generateDataJson = responseFunctions.dataJson;



// functions
function handleGameGetRequest(req, res) {
  let data = generateDataJson(req);
  let errorsToCheck = ['PLAYER_CONNECTED']; // session id check already done in routing
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  }
};

function requestSuccess(data, res) {
  if (players.isPlayerReady(data.sessionId)) { // if player is ready, send wait-screen
    let state = values.state.WAIT;
  } else {  // if player is not ready, send data input screen
    let roomId = players.getRoomIdFromSessionId(data.sessionId);
    let state = rooms.getRoomState(roomId);
  }

  let fileName = values.file[state];
  respondWithFile(res, fileName);
}

function requestError(errorList, res) {
  res.cookie('sessionId', '');
  res.status(401); // forbidden
  respondWithFile(res, values.file.INDEX);
}

function respondWithFile(res, fileName) {
  let filePath = __dirname + values.file.PUBLIC + fileName;
  let file = path.resolve(filePath);

  res.sendFile(file);
}

module.exports = handleGameGetRequest;
