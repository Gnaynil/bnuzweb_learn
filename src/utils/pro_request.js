import fetch from 'dva/fetch';


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  const Header = {
    headers:{
      'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmctdXNlciIsImlhdCI6MTYwMDMzMDgxOSwiZXhwIjoxNjAwNDE3MjE5LCJpZCI6IjEyNjU0ODU4NDUwODc5MjQyMjYiLCJuYW1lIjoiY2hlbmR4In0.bqAd_YYtYTm_13JdBPWDuFfY86KYjH5JStLPD93WZBQ',
    }
  }
  return fetch(url, {options,Header})
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data ))
    .catch((err) => {
      console.log(err, 'err')
    } );
}