function createCookie(data) {
  let key = data.key;
  let value = data.value;
  let time = data.time;
  let path = data.path;

  let keyValue = key + '=' + value + ';';
  let expiresTime = 'expires=' + time + ';';
  let pathPath = 'path=' + path + ';';
  let cookie = keyValue + expiresTime + path + 'secure;';
  document.cookie = cookie;
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function getDatePlusMinutes(minutes) {
  let currentDate = new Date();
  let currentTime = currentDate.getTime();
  let expireTime = currentTime + (minutes * 60 * 1000);
  let expireDate = new Date(expireTime);
  let expireDateText = expireDate.toUTCString();
  return expireDateText;
}

function setSessionIdCookie(sessionId) {
  data = {
    key: values.cookie.SESSION_ID_KEY,
    value: sessionId,
    time: getDatePlusMinutes(values.cookie.DURATION),
    path: '/'
  }
  createCookie(data);
}
