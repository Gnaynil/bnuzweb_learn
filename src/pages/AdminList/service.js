// import request from 'umi-request';
import request01 from '@/utils/bas_request'
import request from '@/utils/bas02_request'

// export async function queryFakeList(params) {
//   console.log(params);
//   return request('/orgservice/org-item/getAllList', {

//     params,
//   });
// }
// /orgservice/org-item/getAllList
// /adminservice/ad-realname/getRealnameInfo/1/15
// export async function queryFakeList(params) {
//   console.log(params);
//   return request('/adminservice/ad-realname/getRealnameInfo/1/15', {
//     method:'POST',
//     params,
//   });
// }
// export async function queryFakeList(params) {
//   console.log(params);
//   return request('/orgservice/v1/org-describe/auth/getDescribe', {
//     method:'POST',
//     params,
//   });
// }

export async function getDescribe(params) {
  return request('/adminservice/ad-realname/getRealnameInfo/1/15', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
export const getData = async (params) => {
  return request01("/orgservice/org-item/getAllList", {
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
