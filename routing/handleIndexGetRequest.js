// variables
var indexFilePath = './../public/index.html';


// required files
const path = require('path');


// functions
function handleIndexGetRequest(req, res) {
  let fullIndexFilePath = path.resolve(__dirname + indexFilePath);
  res.sendFile(fullIndexFilePath);
}




module.exports = handleIndexGetRequest;