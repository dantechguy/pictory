function setToExit() {
  postData(values.url.EXIT)
  .catch(showError);
}
