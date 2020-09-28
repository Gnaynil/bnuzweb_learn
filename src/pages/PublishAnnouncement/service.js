import request from 'umi-request';

export async function SubmitQuill(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
