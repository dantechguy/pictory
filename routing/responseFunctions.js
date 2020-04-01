const generateErrorList = require('./generateErrorList');

// speed up response json responses
function createResponseJson(status, data) {
  let responseJson = {
    status: status,
    data: data,
  }
  return responseJson;
}

// middleware to check for valid session id
function checkSessionId(req, res, next) {
  let data = {
    sessionId: req.cookies.sessionId,
  }
  let errorsToCheck = ['INVALID_SESSION_ID'];
  let errorList = generateErrorList(errorsToCheck, data);
  let noErrors = errorList.length === 0;
  if (noErrors) {
    next();
  } else if (req.path === values.url.GAME) { // if session id on game, return to index
    gameRequestSessionIdError(errorList, res);
  } else {
    requestError(errorList, res);
  }
}

function gameRequestSessionIdError(errorList, res) {
  res.cookie('sessionId', '');
  res.status(401); // forbidden
  res.redirect('/')
}

// generate data json
function generateDataJson(req) {
  let data = {
    sessionId: req.cookies.sessionId,
    roomId: players.getRoomIdFromSessionId(req.cookies.sessionId),
    data: req.body.data,
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
