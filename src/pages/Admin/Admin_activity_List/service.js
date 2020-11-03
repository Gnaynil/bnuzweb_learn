import request from '@/utils/bas02_request'


export async function getDescribe(params) {
  return request(`/adminservice/ad-realname/getActivityRealnameList/${params.current}/${params.limit}`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}

export async function UpdateDescribe(params){
  console.log(params);
  return request('/adminservice/ad-realname/updateActivityRealname',{
    method:'PUT',
    body:JSON.stringify(params)
  })
}