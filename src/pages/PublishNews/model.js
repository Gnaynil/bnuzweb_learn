import { message } from 'antd';
import { addNews } from './service';

const Model = {
  namespace: 'news',
  state: {},
  effects: {
    *addNews({ payload }, { call }) {
      yield call(addNews, payload);
      message.success('添加成功');
    },
  },
};
export default Model;
