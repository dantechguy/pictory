function handleIndexGetRequest(req, res) {
  res.sendFile(__dirname + indexFilePath);
}

module.exports = handleIndexGetRequest;