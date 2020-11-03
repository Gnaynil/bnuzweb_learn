import { getDescribe } from './service';

const Model = {
  namespace: 'AdminActivityList',
  state: {
    list: [],
    meta:{
      current:1,
      limit:1000
    }
  },
  effects: {
    *fetch({ payload,current,limit }, { call, put }) {
      const response = yield call(getDescribe,{payload,current,limit});
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
