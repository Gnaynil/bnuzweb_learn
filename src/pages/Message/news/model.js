import { getNews,deleteNews } from './service';
import { message } from 'antd';
const Model = {
  namespace: 'listNews',
  state: {
    listNews: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getNews, payload);
      yield put({
        type: 'queryList',
        payload: response.data.data.newsList
      });
    },
    *delete({ payload, id }, { call, put }) {
      const response = yield call(deleteNews, { payload, id});
      if (response.data.data) {
        message.success("删除成功");
        const data = yield call(getNews, { payload});
        yield put({
          type: 'queryList',
          payload: data.data.data.newsList
        });
      }
      else {
        message.error("删除失败");
      }
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, listNews: action.payload };
    },
  },
};
export default Model;
