function getRoundData() {
  getData(values.url.DATA)
  .then(setRoundData)
  .catch(getRoundDataError);
}

function getRoundDataError(responseJson) {
  showError(responseJson);
  setTimeout(getRoundData, values.time.RETRY);
}

function setRoundData(responseJson) {
  if (state !== values.state.REPLAY) {
    promptData = responseJson.data.prompt;
    timeLimit = responseJson.data.time;
    if (state === values.state.GUESS) {
      showDrawing(promptData, false);
    } else if (state === values.state.DRAW) {
      showText();
    };
    startTimer();
  } else {
    promptData = responseJson.data;
    generateReplay();
  }
}
