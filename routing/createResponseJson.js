function createResponseJson(status, data) {
  let responseJson = {
    status: status,
    data: data
  }
  return responseJson;
}

module.exports = createResponseJson;
