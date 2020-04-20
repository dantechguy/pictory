function reJoin() {
  goToUrl(values.url.GAME);
}

function tryToHideReJoinButton() {
  if (getCookie(values.cookie.SESSION_ID_KEY) == '') {
    reJoinInputDom.style.display = 'none';
  }
}
