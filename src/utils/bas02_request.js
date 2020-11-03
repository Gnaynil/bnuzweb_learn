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
      "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmctdXNlciIsImlhdCI6MTYwNDI5Mjk1NywiZXhwIjoxNjA0Mzc5MzU3LCJpZCI6IjEyODE5NDAzMjQzODk3NzMzMTQiLCJuYW1lIjoiZ25heW5pbCJ9.FW6k6f7FyDB6ymxV-sDtI5cr_xShjwpy4-unTcqLWpQ",
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