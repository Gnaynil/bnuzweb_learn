import request from '@/utils/bas_request'

//获得轮播图信息
export async function getCover(params) {
  return request(`/orgservice/org-index-cover/auth/getIndexCoverList`, {
    method: 'POST',
    // body: JSON.stringify(params.payload),
  });
}
//添加轮播图信息
export async function addCover(params) {
  return request('/orgservice/org-index-cover/auth/addIndexCover', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

//修改轮播图
export async function updateCover(params) {
  return request(`/orgservice/org-index-cover/auth/updateIndexCover`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}
// //删除轮播图
export async function deleteCover(params) {
  return request(`/orgservice/org-index-cover/auth/deleteIndexCover/${params.id}`, {
    method: 'DELETE',
    // body: JSON.stringify(params),
  });
}
