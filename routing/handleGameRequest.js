// variables
let publicFolder = '/../public/'
let roomStateToFileName = {
  'lobby':'lobby.html',

}


// required files
const path = require('path');
let doesSessionIdExist


// functions
function handleGameRequest(req, res) {
  let isSessionIdValid = 

  let roomId = players.getRoomIdFromUserId(userId);
  let roomState = rooms.getStateOfRoomWithId(roomId);

  let fileName = roomStateToFileName[roomState];
  let filePath = path.resolve(__dirname + publicFolder + fileName);

  res.sendFile(fileDirectory);
};




module.exports = handleGameRequest;