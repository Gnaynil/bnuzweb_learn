import request from '@/utils/bas_request'

export async function getNews(params) {
  return request('/orgservice/v1/org-news/auth/getNews/1/600', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//修改活动
export async function editNews(params) {
  return request(`/orgservice/v1/org-news/auth/updateNews`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

// //删除活动
export async function deleteNews(params) {
  return request(`/orgservice/v1/org-news/auth/deleteNews?nid=${params.id}`, {
    method: 'DELETE',
  });
}