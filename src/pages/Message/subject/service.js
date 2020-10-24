import request from '@/utils/bas_request'
import request02 from '@/utils/bas02_request'

// 查看活动列表
export async function getDescribe(params) {
  return request(`/orgservice/org-activity/auth/getActivityList/${params.current}/${params.limit}`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}

// 查看活动实体列表
export async function getItemActivityList(params) {
  return request(`/orgservice/org-item/getItemList/1/250`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}

//添加活动
export async function addActivity(params) {
  return request(`/orgservice/org-activity-realname/auth/addActivityRealname`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
//修改活动
export async function updateActivity(params) {
  return request(`/orgservice/org-activity/auth/updateActivity`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
// //删除活动
export async function deleteActivity(params) {
  return request(`/orgservice/org-activity/auth/deleteActivity?aid=${params.id}`, {
    method: 'DELETE',
    // body: JSON.stringify(params),
  });
}

//增加活动实体
export async function addItem(params) {
  return request(`/orgservice/org-item/addItem`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
// //删除活动实体
export async function deleteItemActivity(params) {
  return request(`/orgservice/org-item/deleteItem?aid=${params.id}`, {
    method: 'DELETE',
    // body: JSON.stringify(params),
  });
}


//获得活动审核列表
export async function getActivityRealnameList(params) {
  return request(`/orgservice/org-activity-realname/getActivityRealnameList/1/100`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}






//地区 ,标签,分类列表
export async function getRegionList(params) {
  return request02(`/adminservice/ad-region/getRegionList/1/2000`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}
export async function getLabelList(params) {
  return request02(`/adminservice/ad-label/getLabelList/1/1500`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}
export async function getSubjectList(params) {
  return request02(`/adminservice/ad-subject/getSubjectList/1/1250`, {
    method: 'POST',
    body: JSON.stringify(params.payload),
  });
}