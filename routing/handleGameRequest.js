// variables
let publicFolder = './../public/'
let invalidSessionIdFileName = 'invalidSessionId.html';
let roomStateToFileName = {
  'lobby':'lobby.html',

}


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

  let fileName = roomStateToFileName[roomState];
  respondWithFile(res, fileName);
}

function sessionIdNotValid(req, res) {
  respondWithFile(res, invalidSessionIdFileName);
}

function respondWithFile(res, fileName) {
  let filePath = __dirname + publicFolder + fileName;
  let file = path.resolve(filePath);

  res.sendFile(file);
}

module.exports = handleGameRequest;
