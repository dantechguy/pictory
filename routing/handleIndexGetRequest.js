// required files
const path = require('path');


// functions
function handleIndexGetRequest(req, res) {
  let fullIndexFilePath = path.resolve(__dirname + values.file.PUBLIC + values.file.INDEX);
  res.sendFile(fullIndexFilePath);
}


module.exports = handleIndexGetRequest;
