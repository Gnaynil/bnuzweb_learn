// import request from 'umi-request';
import request from '@/utils/bas_request'

export async function SubmitOrgForm(params) {
  return request('/orgservice/v1/org-realname/auth/insertRealname', {
    // mode: 'no-cors',
    method: 'POST',
    body:JSON.stringify(params),
  });
}
