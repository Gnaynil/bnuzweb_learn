import React, { useState, useEffect } from 'react';
import { Modal, Form, Image } from "antd";
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const GetRealnameList = (props) => {
  const { visible, closeHandle, dispatch, listSubject: { realnamelist },loading,orgId} = props;
  useEffect(() => {
    dispatch({
      type: 'listSubject/getRealname',
      //查询条件
      payload: {
        orgId:orgId,
        type: 1
      }
    });
  }, [1]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      key: 'id',
    },
    {
      title: '活动名',
      dataIndex: 'name',
      valueType: 'text',
      key: 'busName',
    },
    {
      title: '活动省份',
      dataIndex: 'provinceName',
      valueType: 'text',
      key: 'provinceName',
    },
    {
      title: '活动城市',
      dataIndex: 'cityName',
      valueType: 'text',
      key: 'cityName',
    },
    {
      title: '活动区县',
      dataIndex: 'countyName',
      valueType: 'text',
      key: 'countyName',
    },
    {
      title: '标签',
      dataIndex: 'labelName',
      valueType: 'text',
      key: 'labelName',
    },
    {
      title: '分类',
      dataIndex: 'subjectName',
      valueType: 'text',
      key: 'subjectName',
    },
    {
      title: "原因",
      dataIndex: 'reason',
      filters: false,
      valueType: 'text',
      key: 'reason'
    },
    {
      title: '状态',
      dataIndex: 'isRealname',
      filters: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '待审核',
          status: 'Processing',
        },
        // 1: {
        //   text: '待审核',
        //   status: 'Processing',
        // },
        2: {
          text: '审核失败',
          status: 'Error',
        },
        1: {
          text: '审核通过',
          status: 'Success',
        },
      },
    },
  ];
  // console.log(realnamelist);
  return (
    <div>
      <Modal
        title="审核信息"
        visible={visible}
        onCancel={closeHandle}
        onOk={closeHandle}
        forceRender
        width={1100}
        cancelText
        okText
      >
        <ProTable
          columns={columns}
          dataSource={realnamelist}
          rowKey="id"
          loading={loading}
          search={false}
          // headerTitle="审核机构列表"
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20, 50, 100]
          }}
          options={{
            density: false,
            fullScreen: false,
            reload: false,
            setting: false,
          }}
        />
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ listSubject, loading }) => {
  return {
    listSubject,
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(GetRealnameList);
