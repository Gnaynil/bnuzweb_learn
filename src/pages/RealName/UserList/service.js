import request from '@/utils/bas_request'


export async function getDescribe(params) {
  return request(`/orgservice/v1/org-realname/auth/getRealnameListByToken`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

// export async function UpdateDescribe(params){
//   console.log(params);
//   return request('/adminservice/ad-realname/updateRealnameStatus',{
//     method:'POST',
//     body:JSON.stringify(params)
//   })
// }