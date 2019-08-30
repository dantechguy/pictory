/*

Successful response:
{
  status: "success",
  data: [session id]
}

Unsuccessful response:
{
  status: "error",
  data: [error message]
}

*/

isNameAndRoomIdValid = require('./isNameAndRoomIdValid');


function handleJoinGetRequest(req, res) {
  let data = getDataJsonFromRequest(req);

  if (isNameAndRoomIdValid(data)) {
    nameAndRoomIdSuccess(res);
  } else {
    nameAndRoomIdError(res);
  };
}

function getDataJsonFromRequest(req) {
  let name = req.query.name;
  let roomId = req.query.roomid;
  let data = {
    name: name,
    roomId: roomId
  }
  return data;
}

function nameAndRoomIdSuccess(res) {
  let responseJson = {
    status: 'success',
    data: 'some session id'
  }
  res.json(responseJson);
}

function nameAndRoomIdError(res) {
  let responseJson = {
    status: 'error',
    data: 'some error message'
  }
  res.json(responseJson);
}

module.exports = handleJoinGetRequest;