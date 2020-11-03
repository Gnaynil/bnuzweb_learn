import { getDescribe } from './service'
const Model = {
  namespace: 'orgUserInfo',
  state: {
    info: []
  },
  effects: {

    //获得机构详细信息
    *fetch({ payload }, { call, put }) {
      const response = yield call(getDescribe, { payload });
      if (response.data.data.describe != null) {
        yield put({
          type: 'describeList',
          payload: response.data.data
        });
      }
    },

  },
  reducers: {
    describeList(state, action) {
      return { ...state, info: action.payload };
    },
  },
  // subscription:{
  //   setup({ dispatch, history }) {
  //     history.listen(({ pathname }) => {
  //       if (pathname === '/my_info') {
  //         dispatch({
  //           type: 'fetch',
  //           payload: {
              
  //           },
  //         });
  //       }
  //     });
  //   },
  // }
};
export default Model;
