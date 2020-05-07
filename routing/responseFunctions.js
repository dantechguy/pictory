const generateErrorList = require('./generateErrorList');


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
  // res.cookie(values.cookie.SESSION_ID_KEY, '', {httpOnly: true, maxAge: 0});
  res.clearCookie(values.cookie.SESSION_ID_KEY, {httpOnly: true});
  res.status(401); // forbidden
  res.redirect('/');
}

// generate data json
function generateDataJson(req) {
  let roomId = players.sessionIdExists(req.cookies.sessionId)
    ? players.player(req.cookies.sessionId).getRoomId()
    : undefined;
  let data = {
    sessionId: req.cookies.sessionId,
    roomId: roomId,
    data: req.body.data,
  }
  return data;
}

// speed up errorlist response json
function requestError(errorList, res) {
  let responseJson = {status: 'error', data: errorList.join(' ')};
  res.status(401); // forbidden
  res.json(responseJson);
}

module.exports = {
  errorList: requestError,
  sessionId: checkSessionId,
  dataJson: generateDataJson,
};
