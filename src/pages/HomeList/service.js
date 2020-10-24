import request from '@/utils/bas_request'

export async function getLoginInfo(params) {
  return request(`/orgservice/v1/org-user/auth/getLoginInfo`, {
    method: 'POST',
    // body: JSON.stringify(params.payload),
  });
}
