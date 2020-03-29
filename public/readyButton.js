// variables
var domButtonDivId = 'readyButton';
var domButtonReadyText = 'I am ready';
var domButtonNotReadyText = 'I am not ready'

var domButtonDiv = document.getElementById(domButtonDivId);
var domButtom;

// functions

function createButton() {
  domButton = document.createElement('button');
  setNotReadyState();
}

function clickedReady() {
  setReadyState();
  postData('ready');
}

function clickedNotReady() {
  setNotReadyState();
  postData('not ready')
}

function setReadyState() {
  domButton.textContent = domButtonReadyText;
  domButton.setAttribute('onclick', 'clickedNotReady()');
}

function setNotReadyState() {
  domButton.textContent = domButtonNotReadyText;
  domButton.setAttribute('onclick', 'clickedReady()');
}


// setup
createButton();
