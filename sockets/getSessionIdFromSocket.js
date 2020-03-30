// required files
const parseCookieString = require('./parseCookieString');


function getSessionIdFromSocket(socket) {
  let cookieString = socket.handshake.headers.cookie;
  let sessionId = getCookieFromSting(cookieString, values.cookie.SESSION_ID_KEY);
  return sessionId;
}

function getCookieFromSting(cookieString, name) {
  var value = "; " + cookieString;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}


module.exports = getSessionIdFromSocket;
