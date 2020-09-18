// import request from 'umi-request';
import config from '@/config'
import request from '@/utils/ins_request'
// `${config.testUrl}/users`
// /users'
// /orgservice/org-item/getAllList
//2653
export const getData = async (params) => {
  return request('/personalized', {
    method: 'get',

  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      // return false;
    });

}

export const getDescribe = async (params) => {
  return request('/orgservice/v1/org-describe/auth/getDescribe', {
    method: 'POST',

  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      // return false;
    });
}

export const deleteData = async (params) => {
  return request('/users/2653', {
    method: 'PATCH',

  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      // return false;
    });
}


// export const getData = async (params) => {
//   return request('http://public-api-v1.aspirantzhang.com/users', {
//     method: 'get',

//   })
//     .then(function (response) {
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       // return false;
//     });

// }