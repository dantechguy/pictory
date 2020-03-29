function getData(url) {
  return fetchRequest('get', url);
}

function postData(url, data) {
  return fetchRequest('post', url, data);
}

function putData(url, data) {
  return fetchRequest('put', url, data);
}

async function fetchRequest (type, url, data) {
  const init = {
    method: type,
    contentType: "application/json",  // redundant with get, but used for put and post
    data: data,   // only sends data when provided, eg put and post
    credentials: "same-origin", // to send cookies, eg session idea
  }
  fetch(url, init)
  .then((data) => {
    return data;
  });
}
