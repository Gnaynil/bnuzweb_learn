import { getDescribe ,getLoginInfo} from './service';

const Model = {
  namespace: 'HomeList',
  state: {
    user:{}
  },
  effects: {
    *get({ payload }, { put, call }) {
      const data = yield call(getLoginInfo, { payload });
      // console.log(data,2222);
      if (data) {
        yield put({
          type: "getLogin",
          payload: data.data.data
        })
      }
    },
    
  },
  reducers: {
    getLogin(state, action) {
      return { ...state, user: action.payload };
    }
  },
};
export default Model;
