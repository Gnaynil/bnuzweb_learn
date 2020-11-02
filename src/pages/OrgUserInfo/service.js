import request from '@/utils/bas_request'
import request02 from '@/utils/bas02_request'

// 查看机构详细信息
export async function getDescribe(params) {
  return request(`/orgservice/v1/org-describe/auth/getDescribe`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
//修改机构描述信息
export async function updateDescribe(params) {
  console.log(params);
  return request(`/orgservice/v1/org-describe/auth/updateDescribe`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}