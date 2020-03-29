function getData(url) {
  return request('get', url);
}

function postData(url, data) {
  return request('post', url, data);
}

function putData(url, data) {
  return request('put', url, data);
}

// any type of error=catch, success=then
function request(type, url, data) {
  let promise = new Promise((resolve, reject) => {
    fetchRequest(url, init)
    .then((response) => {
      if (responseIsSuccessful) {
        resolve(response.json().data)
      } else {
        reject(response.json().data)
      }
    })
    .catch((networkError) => { // fetch only fails on network errors
      reject(networkError);
    });
  });
  return promise;
}

function responseIsSuccessful(response) {
  return repsonse.ok && response.json().status === 'success';
}

function fetchRequest(url, init) {
  const init = {
    method: type,
    contentType: "application/json",  // redundant with get, but used for put and post
    data: data,   // only sends data when provided, eg put and post
    credentials: "same-origin", // to send cookies, eg session idea
  }
  return fetch(url, init);
}
