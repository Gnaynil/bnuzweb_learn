import request from '@/utils/bas_request'

export async function getOrderItem(params) {
  return request(`/orgservice/yx-order-item/getOrderListByItemId`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
