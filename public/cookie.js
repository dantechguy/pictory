// function createCookie(data) {
//   let key = data.key;
//   let value = data.value;
//   let path = data.path;
//
//   let keyValue = key + '=' + value + ';';
//   let pathPath = 'path=' + path + ';';
//   let cookie = keyValue + path + 'secure;';
//   document.cookie = cookie;
// }

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  else return '';
}
