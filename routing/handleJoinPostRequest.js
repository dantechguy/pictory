const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateErrorList = require('./generateErrorList');
const whatIsWrongWithNameAndRoomId = require('./whatIsWrongWithNameAndRoomId');


function handleJoinPostRequest(req, res) {
  let data = req.body;
  let errorsToCheck = ['INVALID_NAME', 'INVALID_ROOM_ID'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  };
}

function requestSuccess(data, res) {
  rooms.createRoom(data.roomId);
  sessionId = players.createPlayerReturnSessionId(data);
  responseJson = createResponseJson('success', '');
  res.cookie(values.cookie.SESSION_ID_KEY, sessionId, {httpOnly: true, secure: true});
  res.json(responseJson);
}

module.exports = handleJoinPostRequest;
