function parseCookieString(cookieString) {
  let cookieList = cookieString.split("; ");
  let cookies = {};
  for (let i=0; i<cookieList.length; i++) {
    let splitCookieString = cookieList[i].split("=");
    let cookieKey = splitCookieString[0];
    let cookieValue = splitCookieString[1];
    cookies[cookieKey] = cookieValue;
  }
  return cookies;
}


module.exports = parseCookieString;