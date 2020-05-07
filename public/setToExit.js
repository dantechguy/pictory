function setToExit() {
  postData(values.url.EXIT)
  .then(() => {goToUrl(values.url.INDEX)})
  .catch(showError);
}
