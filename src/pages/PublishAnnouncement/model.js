import { message } from 'antd';
import { SubmitQuill } from './service';

const Model = {
  namespace: 'annoucement',
  state: {},
  effects: {
    *submitAnnoucement({ payload }, { call }) {
      yield call(SubmitQuill, payload);
      message.success('提交成功');
    },
  },
};
export default Model;
