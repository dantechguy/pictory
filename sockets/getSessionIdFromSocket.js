// required files
var parseCookieString = require('./parseCookieString');


function getSessionIdFromSocket(socket) {
  let cookieString = socket.handshake.headers.cookie
  return parseCookieString(cookieString);
}

module.exports = getSessionIdFromSocket;