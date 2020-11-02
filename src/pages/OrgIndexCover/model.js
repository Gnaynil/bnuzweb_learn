import { getCover,deleteCover,addCover } from './service';
import { message } from 'antd';
const Model = {
  namespace: 'listCover',
  state: {
    listCover: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getCover, payload);
      yield put({
        type: 'queryList',
        payload: response.data.data.IndexCover
      });
    },
    *delete({ payload, id }, { call, put }) {
      const response = yield call(deleteCover, { payload, id});
      if (response.data.data) {
        message.success("删除成功");
        const data = yield call(getCover, { payload});
        yield put({
          type: 'queryList',
          payload: data.data.data.IndexCover
        });
      }
      else {
        message.error("删除失败");
      }
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, listCover: action.payload };
    },
  },
};
export default Model;
