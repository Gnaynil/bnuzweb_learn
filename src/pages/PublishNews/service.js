import request from '@/utils/bas_request'

export async function addNews(params) {
  console.log(params);
  return request('/orgservice/v1/org-news/auth/addNews', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
