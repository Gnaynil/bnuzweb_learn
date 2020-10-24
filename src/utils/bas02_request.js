import {fetch} from 'dva'

const baseApi ="http://120.25.124.250:8002";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  // console.log(response, 'response')
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return fetch(baseApi+url, {
    ...options,
    headers:{
      "Content-Type":"application/json",
      "Accept": "*/*",
      "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmctdXNlciIsImlhdCI6MTYwMzQyNTIxOCwiZXhwIjoxNjAzNTExNjE4LCJpZCI6IjEyODE5NDAzMjQzODk3NzMzMTQiLCJuYW1lIjoiZ25heW5pbCJ9.3VnQeY_NN7OeG-g9X2473UfkBRBgr2pBq-2ZiOT62sk",
      // "Accept":"*/*",
      // "Connection":"keep-alive"
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch((err) => {
      console.log(err, 'err')
    } );
}