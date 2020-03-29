// variables
var domButtonId = 'readyButton';
const domButtonText = 'ready';

var domButtom = document.getElementById(domButtonId);

// functions

function clickedReady() {
  postData(values.url.READY)
  .then()
  .catch(showError);
  domButton.style.display = 'none';
}

function setNotReadyState() {

}

function setup() {
  domButton.textContent = domButtonText;

}
