// required files
const path = require('path');


// functions
function handleGameRequest(req, res) {
  let sessionId = req.cookies.sessionId;
  let playerExists = players.sessionIdExists(sessionId);
  let playerIsDisconnected = players.isDisconnected(sessionId);
  let sessionIdIsValid = playerExists && playerIsDisconnected;

  if (sessionIdIsValid) {
    sessionIdValid(req, res);
  } else {
    sessionIdNotValid(req, res);
  }
};

function sessionIdValid(req, res) {
  let sessionId = req.cookies.sessionId;
  let roomId = players.getRoomIdFromSessionId(sessionId);
  let roomState = rooms.getRoomState(roomId);

  let fileName = values.file[roomState];
  respondWithFile(res, fileName);
}

function sessionIdNotValid(req, res) {
  res.cookie('sessionId', '');
  respondWithFile(res, values.file.INDEX);
}

function respondWithFile(res, fileName) {
  let filePath = __dirname + values.file.PUBLIC + fileName;
  let file = path.resolve(filePath);

  res.sendFile(file);
}

module.exports = handleGameRequest;
