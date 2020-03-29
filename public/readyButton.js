// variables
var domButtonId = 'readyButton';
const domButtonText = 'ready';
const readyUrlPath = '/ready';

var domButtom = document.getElementById(domButtonId);

// functions

function clickedReady() {
  let request = postData(readyUrlPath);
  domButton.style.display = 'none';
}

function setNotReadyState() {

}

function setup() {
  domButton.textContent = domButtonNotReadyText;

}
