import request from 'umi-request';

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
export async function getDescribe(params) {
  return request(`/adminservice/ad-realname/getRealnameInfo/${params.current}/${params.limit}`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}