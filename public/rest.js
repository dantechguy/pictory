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
    .then(response => {
      let contentTypeHeader = response.headers.get('content-type');
      let responseIsJson = contentTypeHeader && contentTypeHeader.indexOf('application/json') !== -1;

      if (responseIsJson) {
        response.json().then(responseJson => {
          if (responseJson.status === 'success') {
            resolve(responseJson);
          } else if (responseJson.status === 'error') {
            reject(responseJson.data);
          };
        });
      } else {
        reject(response.statusText);
      }

    //   if (response.ok) {
    //     console.log('ok');
    //     return response.json();
    //   } else {
    //     console.log('not ok');
    //     reject(response.statusText); // not 200
    //   }
    })
    .catch(networkError => { // fetch only fails on network errors
      reject(networkError); // network error
    });
  });
  return promise;
}

// function handleFetchThen(resolve, reject) {
//   return (response) => {
//     response.json().then(responseJson => { // responseJson is another promise
//       console.log(responseJson);
//       if (response.ok && responseJson.status === 'success') {
//         console.log('success', response.ok, responseJson);
//         resolve(responseJson)
//       } else {
//         console.log('error: reject');
//         reject(responseJson)
//       }
//     });
//   };
// }

function fetchRequest(type, url, data) {
  const init = {
    method: type,
    headers: {'Content-Type': 'application/json'},  // redundant with get, but used for put and post
    body: JSON.stringify(data),   // only sends data when provided, eg put and post
    credentials: "same-origin", // to send cookies, eg session idea. might be default
  }
  return fetch(url, init);
}
