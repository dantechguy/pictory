// required files
const path = require('path');
const generateErrorList = require('./generateErrorList');
const responseFunctions = require('./responseFunctions');
const generateDataJson = responseFunctions.dataJson;
const requestError = responseFunctions.errorList;


// functions
function handleGameGetRequest(req, res) { // handle game session error in middleware, game error should be normal
  let data = generateDataJson(req);
  let errorsToCheck = ['PLAYER_CONNECTED', 'INVALID_SESSION_ID'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res)
  }
};

function requestSuccess(data, res) {
  let state;
  if (players.isPlayerReady(data.sessionId)) { // if player is ready, send wait-screen
    state = values.state.WAIT;
  } else {  // if player is not ready, send data input screen
    let roomId = players.getRoomIdFromSessionId(data.sessionId);
    state = rooms.getRoomState(roomId);
  }

  let fileName = values.file[state];
  respondWithFile(res, fileName);
}

function respondWithFile(res, fileName) {
  let filePath = __dirname + values.file.PUBLIC + fileName;
  let file = path.resolve(filePath);

  res.sendFile(file);
}

module.exports = handleGameGetRequest;
