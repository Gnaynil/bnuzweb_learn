import { message } from 'antd';
import { getData,getLoginInfo } from './service';


const Model = {
  namespace: 'list',
  state: {

  },
  effects: {
    *getRemote({ payload }, { put, call }) {
      const data = yield call(getData, { payload });
      // console.log(data);
      if (data) {
        yield put({
          type: "getList",
          payload: data
        })
      }
    },
    *fetch({ payload }, { put, call }) {
      const data = yield call(getLoginInfo, { payload });
      // console.log(data);
      if (data) {
        yield put({
          type: "getLogin",
          payload: data
        })
      }
    },
    
  },
  reducers: {
    getList(state, { payload }) {
      return payload;

    },
    getLogin(state, { payload }) {
      return payload;

    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/welcome') {
          dispatch({
            type: 'getRemote',
            // type: 'fetch',
          })
        }
      });
    }
  }
}

export default Model;