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
    nameAndRoomIdSuccess();
  }
  
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

function nameAndRoomIdSuccess() {
  let responseJson = {
    status: 'success',
    data: 
  }
}

function nameAndRoomIdError() {
  let responseJson = {
    status: 'error',
    data: 
  }
}

module.exports = handleJoinGetRequest;