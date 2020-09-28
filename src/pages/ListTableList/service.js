import request from 'umi-request';

export async function queryRule(params) {
  console.log(params);
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  console.log(params);
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  console.log(params);
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });

}
export async function updateRule(params) {
  console.log(params);
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
