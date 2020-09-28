import { message } from 'antd';
import { SubmitOrgForm } from './service';

const Model = {
  namespace: 'orgRealName',
  state: {},
  effects: {
    *submitOrgForm({ payload }, { call }) {
      yield call(SubmitOrgForm, payload);
      message.success('提交成功');
    },
  },
};
export default Model;
