function startTimer(data) {
  setInterval(updateTimer, values.time.TIMER);
}

function updateTimer() {
  let timeLeft = Math.max(0, ((timeLimit - new Date().getTime())/1000)).toFixed(values.time.TIMER_DP);
  let timeDiv = document.getElementById(values.dom.timer.attributes.id);
  timeDiv.textContent = timeLeft;
}
