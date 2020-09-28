import { getDescribe } from './service';

const Model = {
  namespace: 'AdminList',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getDescribe, payload);
      yield put({
        type: 'queryList',
        payload: response.data.data
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    }
  },
};
export default Model;
