// function name defined in values
function submit() {
  updateInputData();
  if (state === values.state.INDEX) {
    trySendJoinPostRequest();
  } else if (submitDataIsEmpty() ? confirm(values.error.EMPTY_SUBMIT) : true) {
    putData(values.url.DATA, {data: {prompt: submitData}})
    .catch(showError);
  };
}


function trySendJoinPostRequest() {
  if (nameAndRoomIdAreValid()) {
    sendPostJoinRequest({data: submitData});
  } else {
    showError(whatIsWrongWithNameAndRoomId(submitData));
  };
}

// sending and processing join request
function sendPostJoinRequest(submitData) {
  let requestJsonBody = submitData;
  postData(values.url.JOIN, requestJsonBody)
  .then((responseJson) => {goToUrl(values.url.GAME)})
  .catch(showError);
}
