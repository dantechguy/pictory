const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateDataJson = responseFunctions.dataJson;
const generateErrorList = require('./generateErrorList');


function handleTimeGetRequest(req, res) {
  let data = generateDataJson(req);
  let errorsToCheck = ['ROOM_NOT_STARTED']; // session id check already done in routing
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  }
}

function requestSuccess(data, res) {
  let roomId = players.getRoomIdFromSessionId(data.sessionId);
  let roomTime = rooms.getRoomTime(roomId);
  let responseJson = createResponseJson('success', roomTime);
  res.json(responseJson);
}

module.exports = handleTimeGetRequest;
