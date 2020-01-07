// variables
var domButtonId = 'readyButton';
var domButtonReadyText = 'I am ready';
var domButtonNotReadyText = 'I am not ready'


// functions
function setupDomButton() {
  var domButton = document.getElementById(domButtonId);
}

function clickedReady() {
  setReadyState();
  sendSocketMessage('ready');
}

function setReadyState() {
  domButton.textContent = domButtonReadyText;
  domButton.setAttribute('onclick', 'clickedNotReady()');
}

function clickedNotReady() {
  setNotReadyState();
  sendSocketMessage('not ready')
}

function setNotReadyState() {
  domButton.textContent = domButtonNotReadyText;
  domButton.setAttribute('onclick', 'clickedReady()');
}