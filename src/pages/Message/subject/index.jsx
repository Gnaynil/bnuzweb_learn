import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Col, Form, List, Row, Input, Tag, Image, message, Popconfirm, Avatar, Alert } from 'antd';
import moment from 'moment';
import { PlusOutlined, SnippetsOutlined, ExclamationCircleOutlined, ZoomInOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styles from './style.less';
import GetActivityRealnameList from './components/GetActivityRealnameList';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
const { confirm } = Modal;
const { Search } = Input;
const Subject = (props) => {
  const {
    loading,
    dispatch,
    visible,
    listSubject: { listSubject, meta },
    HomeList: { user }
  } = props;
  // localStorage.setItem("listSujectRecord",JSON.stringify(listSubject));
  //获取用户头像
  let avatar;
  let orgId;
  if (user.user) {
    avatar = user.user.avatar
    orgId = user.user.id
  }



  useEffect(() => {
    dispatch({
      type: 'listSubject/fetch',
      payload: {
        type: 1
      },
      current: meta.current,
      limit: meta.limit
    }, [visible]);
    // dispatch({
    //   type: 'HomeList/get',
    // });
    dispatch({
      type: 'listSubject/getRegion',
      //查询条件
      payload: {

      }
    });
    dispatch({
      type: 'listSubject/getLabel',
      //查询条件
      payload: {

      }
    });
    dispatch({
      type: 'listSubject/getSubject',
      //查询条件
      payload: {

      }
    });
  }, []);
  const columns = [
    {
      title: '活动名',
      align: 'center',
      dataIndex: 'name',
      valueType: 'text',
      key: 'id',
    },
    {
      title: '地点',
      valueType: 'text',
      key: 'address',
      render: (_, record) => [
        <div>{record.provinceName+record.cityName+record.countyName}</div>
      ]
    },
    {
      title: '标签',
      dataIndex: 'label',
      filters: true,
      valueType: 'text',
      key: 'label',
      valueEnum: {
        1: {
          text: '古典',
        },
        2: {
          text: '现代',
        },
        4: {
          text: '好好学习',
        },
        5: {
          text: '科技',
        },
      },
    },
    {
      title: '分类',
      dataIndex: 'subject',
      filters: true,
      valueType: 'text',
      key: 'subject',
      valueEnum: {
        1: {
          text: '游学',
        },
        2: {
          text: '参观',
        },
        3: {
          text: '体验',
        },
      },
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key="GA" type="primary" onClick={() => GetItemActivity(record)}>查看活动列表</Button>,
        <Button key="UA" style={{ marginLeft: "5px", backgroundColor: "#FBFF2B" }} onClick={() => UpdateItemActivity(record)}>修改活动</Button>,
        <Button key="DA" type="primary" danger style={{ marginLeft: "5px" }} onClick={() => DeleteItemActivity(record.id)}>删除</Button>
      ]
    },
  ];

  const [modalGetVisible, setModalGetVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();


  //刷新活动列表
  const resetHandle = () => {
    dispatch({
      type: 'listSubject/fetch',
      //查询条件
      payload: {
        type: 1
      },
      current: meta.current,
      limit: meta.limit
    });
  }

  //添加活动
  const AddItemActivity = (item) => {

    history.push("/add_item");
  }
  const UpdateItemActivity = (item) => {
    localStorage.setItem("ItemMessage", JSON.stringify(item));
    history.push("/update_item");
  }

  //查看审核列表的Modal
  const GetItemRealnameActivity = () => {
    setModalGetVisible(true)
  }
  const GetItemActivity = (item) => {
    localStorage.setItem("ActMessage", JSON.stringify(item));
    history.push("/itemlist");
  }
  const DeleteItemActivity = (id) => {

    confirm({
      title: '确认删除该活动吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        setConfirmLoading(true);
        dispatch({
          type: 'listSubject/delete',
          payload: {
            type: 1
          },
          id: id,
          current: meta.current,
          limit: meta.limit
        });
        setConfirmLoading(false);
      },
    });

  }
  const closeGetHandle = () => {
    setModalGetVisible(false);
  };
  const searchActivityHandle = (value) => {
    console.log(value);
    dispatch({
      type: 'listSubject/fetch',
      //查询条件
      payload: {
        type: 1,
        name: value
      },
      current: meta.current,
      limit: meta.limit
    });
  }

  return (
    <>
      <ProTable
        columns={columns}
        dataSource={listSubject}
        rowKey="id"
        loading={loading}
        search={false}
        headerTitle="活动列表"
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: [10, 20, 50, 100]
        }}
        options={{
          density: false,
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        toolBarRender={() => [
          <Input.Group key="IG">
            <Search
              placeholder="搜索机构ID"
              onSearch={(value) => searchActivityHandle(value)}
              style={{ width: 200 }}
              allowClear
            />
          </Input.Group>,
          // <Button key="reset" onClick={resetHandle}>刷新</Button>,
          <Button key="ATA" type="primary" onClick={() => AddItemActivity()}>
            <PlusOutlined />新建活动
          </Button>,
          <Button key="GRA" type="primary" onClick={GetItemRealnameActivity}>
            <SnippetsOutlined />查看活动审核情况
          </Button>
        ]}
      />
      <GetActivityRealnameList
        visible={modalGetVisible}
        closeHandle={closeGetHandle}
        orgId={orgId}
      >
      </GetActivityRealnameList>
    </>
  );
};

const mapStateToProps = ({ listSubject, loading, HomeList }) => {
  return {
    listSubject,
    HomeList,
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(Subject);
