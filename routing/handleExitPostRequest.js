const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateErrorList = require('./generateErrorList');


function handleJoinPostRequest(req, res) {
  let data = req.body;
  let errorsToCheck = ['INVALID_SESSION_ID', 'ROOM_ENDED'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;

  if (noErrors) {
    requestSuccess(data, res);
  } else {
    requestError(errorList, res);
  };
}

function requestSuccess(data, res) {
  let player = players.getPlayer(data.sessionId);
  player.setToExit();
  responseJson = createResponseJson('success', '');
  res.cookie(values.cookie.SESSION_ID_KEY, sessionId, {httpOnly: true}); // , secure: true
  res.json(responseJson);
}

module.exports = handleJoinPostRequest;
