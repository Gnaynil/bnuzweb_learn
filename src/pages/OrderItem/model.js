import {getOrderItem} from './service';

const Model = {
  namespace: 'OrderItem',
  state: {
    orderList:{}
  },
  effects: {
    *get({ payload }, { put, call }) {
      const response = yield call(getOrderItem,payload);
      if (response) {
        yield put({
          type: "getOrderItem",
          payload: response.data.data.orderList
        })
      }
    },
    
  },
  reducers: {
    getOrderItem(state, action) {
      return { ...state, orderList: action.payload };
    }
  },
};
export default Model;
