import { getDescribe, deleteActivity, getActivityRealnameList, getRegionList, getLabelList, getSubjectList, getItemActivityList,deleteItemActivity } from './service';
import { message } from 'antd';
const Model = {
  namespace: 'listSubject',
  state: {
    listSubject: [],
    meta: {
      current: 1,
      limit: 1000
    },
    realnamelist: [],
    regionList: [],
    labelList: [],
    subjectList: [],
    itemList: [],
  },
  effects: {

    //获得活动列表
    *fetch({ payload, current, limit }, { call, put }) {
      const response = yield call(getDescribe, { payload, current, limit });
      // console.log(response);
      yield put({
        type: 'queryList',
        payload: response.data.data.ActivityList
      });
    },
    *delete({ payload, id, current, limit }, { call, put }) {
      const response = yield call(deleteActivity, { payload, id, current, limit });
      if (response.data.data) {
        message.success("删除成功");
        const data = yield call(getDescribe, { payload, current, limit });
        yield put({
          type: 'queryList',
          payload: data.data.data.ActivityList
        });
      }
      else {
        message.error("删除失败");
      }
    },
    

    //获得审核列表
    *getRealname({ payload }, { call, put }) {
      const response = yield call(getActivityRealnameList, { payload });
      yield put({
        type: 'realnameList',
        payload: response.data.data.activityRealnameList
      });
    },

    //获得活动实体列表
    *getItemActivityList({ payload }, { call, put }) {
      const response = yield call(getItemActivityList, { payload });
      yield put({
        type: 'itemList',
        payload: response.data.data.itemList
      });
    },
    //删除活动实体
    *deleteItem({ payload, id, current, limit }, { call, put }) {
      const response = yield call(deleteItemActivity, { payload, id, current, limit });
      if (response.data.data) {
        message.success("删除成功");
        const data = yield call(getItemActivityList, { payload, current, limit });
        yield put({
          type: 'itemList',
          payload: data.data.data.itemList
        });
      }
      else {
        message.error("删除失败");
      }
    },


    //地区 ,标签,分类列表
    *getRegion({ payload }, { call, put }) {
      const response = yield call(getRegionList, { payload });
      yield put({
        type: 'regionList',
        payload: response.data.data.regionList
      });
    },
    *getLabel({ payload }, { call, put }) {
      const response = yield call(getLabelList, { payload });
      yield put({
        type: 'labelList',
        payload: response.data.data.labelList
      });
    },
    *getSubject({ payload }, { call, put }) {
      const response = yield call(getSubjectList, { payload });
      yield put({
        type: 'subjectList',
        payload: response.data.data.subjectList
      });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, listSubject: action.payload };
    },
    realnameList(state, action) {
      return { ...state, realnamelist: action.payload };
    },
    itemList(state, action) {
      return { ...state, itemList: action.payload };
    },
    regionList(state, action) {
      return { ...state, regionList: action.payload };
    },
    labelList(state, action) {
      return { ...state, labelList: action.payload };
    },
    subjectList(state, action) {
      return { ...state, subjectList: action.payload };
    },
  }
};
export default Model;
