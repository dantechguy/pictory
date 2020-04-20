function setupTimer() {
  getData(values.url.TIME)
  .then(startTimer)
  .catch(timerError);
}

function timerError(data) {
  showError(data);
  setTimeout(setupTimer, values.time.RETRY);
}

function startTimer(data) {
  timeLimit = data.data;
  setInterval(updateTimer, values.time.TIMER);
}

function updateTimer() {
  let timeLeft = ((timeLimit - new Date())*100).toFixed(values.time.TIMER_DP);
  let timeDiv = document.getElementById(values.dom.timer.attributes.id);
  timeDiv.textContent = timeLeft;
}
