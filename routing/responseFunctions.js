const generateErrorList = require('./generateErrorList');

// speed up response json responses
function createResponseJson(status, data) {
  let responseJson = {
    status: status,
    data: data
  }
  return responseJson;
}

// middleware to check for valid session id
function checkSessionId(req, res) {
  let data = {
    sessionId: req.cookies.sessionId,
  }
  let errorsToCheck = ['INVALID_SESSION_ID'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;
  if (noErrors) {
    next();
  } else {
    requestError(errorList, res);
  }
}

// generate data json
function generateDataJson(req) {
  let data = {
    sessionId: req.cookie.sessionId,
    roomId: players.getRoomIdFromSessionId(req.cookies.sessionId),
    data: req.body.data;
  }
  return data;
}

// speed up errorlist response json
function requestError(errorList, res) {
  let responseJson = createResponseJson('error', errorList.join(' '));
  res.status(401); // forbidden
  res.json(responseJson);
}

module.exports = {
  responseJson: createResponseJson,
  errorList: requestError,
  sessionId: checkSessionId,
  dataJson: generateDataJson,
};
