// import config from '@/config'
import request from '@/utils/bas_request'
// import request from '@/utils/bas02_request'

export const getData = async (params) => {
  return request("/orgservice/org-item/getAllList", {
    // mode: 'no-cors',
    method: 'GET',
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
  return request('/adminservice/ad-realname/getRealnameInfo/{1}/{15}', {
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

// export const deleteData = async (params) => {
//   return request('/users/2653', {
//     method: 'PATCH',

//   })
//     .then(function (response) {
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       // return false;
//     });
// }

