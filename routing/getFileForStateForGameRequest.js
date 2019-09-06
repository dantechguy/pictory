// variables
let publicFolder = '/../public/'


// required files
const path = require('path');


// functions
function getFileForStateForGameRequest(userId) {
  let fileName = 'lobby.html';
  let filePath = path.resolve(__dirname + publicFolder + fileName);
  return filePath;
};




module.exports = getFileForStateForGameRequest;