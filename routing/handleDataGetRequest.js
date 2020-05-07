const responseFunctions = require('./responseFunctions');
const createResponseJson = responseFunctions.responseJson;
const requestError = responseFunctions.errorList;
const generateDataJson = responseFunctions.dataJson;
const generateErrorList = require('./generateErrorList');


function handleDataPutRequest(req, res) {
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
  let playerData, timeLimit, responseJson;
  let room = rooms.room(data.roomId);
  let player = players.player(data.sessionId);
  let roomState = room.getState();
  if (roomState === values.state.REPLAY) { // game has ended, send chain data
    playerData = player.getChainData();
    responseJson = {status: 'success', data: playerData};
  } else if (roomState === values.state.IDEA || player.isReady()) { // if making idea, no prompt to get
    timeLimit = room.getTimeLimit();
    responseJson = {status: 'success', data: {
      time: timeLimit,
    }};
  } else { // game is still going, send following player data and time
    let followingPlayerSessionId = player.getFollowingPlayerSessionId()
    playerData = players.player(followingPlayerSessionId).getData();
    timeLimit = room.getTimeLimit();
    responseJson = {status: 'success', data: {
      prompt: playerData,
      time: timeLimit,
    }};
  }
  res.json(responseJson);
}

module.exports = handleDataPutRequest;
