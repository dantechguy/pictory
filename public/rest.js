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
    fetchRequest(type, url, data)
    .then(handleFetchThen(resolve, reject))
    .catch((networkError) => { // fetch only fails on network errors
      reject(networkError);
    });
  });
  return promise;
}

function handleFetchThen(resolve, reject) {
  return (response) => {
    let statusIsOk = response.ok;
    response.json().then(responseJson => { // responseJson is another promise
      if (responseIsSuccessful(statusIsOk, responseJson)) {
        resolve(responseJson.data)
      } else {
        reject(responseJson.data)
      }
    });
  };
}

function responseIsSuccessful(statusIsOk, responseJson) {
  return statusIsOk && responseJson.status === 'success';
}

function fetchRequest(type, url, data) {
  const init = {
    method: type,
    headers: {'Content-Type': 'application/json'},  // redundant with get, but used for put and post
    body: JSON.stringify(data),   // only sends data when provided, eg put and post
    credentials: "same-origin", // to send cookies, eg session idea. might be default
  }
  return fetch(url, init);
}
