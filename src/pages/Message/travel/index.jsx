import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Col, Form, List, Row, Select, Tag, Image, message, Popconfirm, Avatar, Alert } from 'antd';
import moment from 'moment';
import { PlusOutlined, SnippetsOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import AddActivity from './components/AddActivity';
import GetActivityRealnameList from './components/GetActivityRealnameList';
import { addActivity } from './service';
const { confirm } = Modal;

const Subject = (props) => {
  const {
    loading,
    dispatch,
    listTravel: { listTravel, meta, regionList, labelList, subjectList },
    HomeList: { user }

  } = props;

  //获取用户头像
  let avatar;
  let orgId;
  if (user.user) {
    avatar = user.user.avatar
    orgId = user.user.orgId
  }



  useEffect(() => {
    dispatch({
      type: 'listTravel/fetch',
      payload: {
        type: 0
      },
      current: meta.current,
      limit: meta.limit
    });
    dispatch({
      type: 'HomeList/get',
    });
    dispatch({
      type: 'listTravel/getRegion',
      //查询条件
      payload: {

      }
    });
    dispatch({
      type: 'listTravel/getLabel',
      //查询条件
      payload: {

      }
    });
    dispatch({
      type: 'listTravel/getSubject',
      //查询条件
      payload: {

      }
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalGetVisible, setModalGetVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  // let region;
  // if (regionList) {
  //   region=regionList
  // }
  // let label;
  // if (labelList) {
  //   label=labelList
  // }

  // const formItemLayout = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 24,
  //     },
  //     md: {
  //       span: 12,
  //     },
  //   },
  // };

  //添加活动的Modal
  const closeHandle = () => {
    setModalVisible(false);
  };
  const onFinish = async (params) => {
    console.log(params);
    params.provinceId = params.address[0];
    params.cityId = params.address[1];
    params.countyId = params.address[2];
    delete params.address;

    setConfirmLoading(true);
    const result = await addActivity({
      ...params,
    });

    if (result) {
      setModalVisible(false);
      message.success('添加成功');

      //刷新查看活动审核情况
      dispatch({
        type: 'listTravel/getRealname',
        //查询条件
        payload: {
          orgId: orgId,
          type: 0
        }
      });
      resetHandle();
      setConfirmLoading(false);
    }
  }

  //刷新活动列表
  const resetHandle = () => {
    dispatch({
      type: 'listTravel/fetch',
      //查询条件
      payload: {
        type: 0
      },
      current: meta.current,
      limit: meta.limit
    });
  }

  const AddItemActivity = () => {
    setModalVisible(true)
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
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setConfirmLoading(true);
        dispatch({
          type: 'listTravel/delete',
          payload: {
            type: 0
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



  return (
    <>

      {      <Card
        style={{
          marginTop: 24,
        }}
        title="活动列表"
        bordered={false}
        bodyStyle={{
          padding: '8px 32px 32px 32px',
        }}
        extra={
          <div>
            <Button type="primary" onClick={AddItemActivity}>
              <PlusOutlined />新建活动
            </Button>
            <Button type="primary" onClick={GetItemRealnameActivity} style={{ marginLeft: 30 }}>
              <SnippetsOutlined />查看活动审核情况
            </Button>
          </div>

        }
      >
        {<List
          size="large"
          loading={loading}
          rowKey="id"
          itemLayout="vertical"
          // loadMore={loadMore}
          dataSource={listTravel}
          pagination={{
            pageSize: 10
          }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <div>
                  <Button type="primary" className={styles.listItemButton} onClick={() => GetItemActivity(item)}>查看活动实体列表</Button>
                  <Button type="primary" danger className={styles.listItemButton} style={{ marginLeft: "15px" }} onClick={() => DeleteItemActivity(item.id)}>删除</Button>
                </div>
              }
            >
              <List.Item.Meta
                description={
                  <div>
                    标签:<span>
                      <Tag color="magenta" >{item.labelName}</Tag>
                    </span>
                    分类:<span>
                      <Tag color="volcano" >{item.subjectName}</Tag>
                    </span>
                  </div>
                }
                title={item.name}
              />
              <div className={styles.listContent}>
                <div className={styles.description}>
                  <Tag color="#108ee9">{item.provinceName}</Tag>
                  <Tag color="#108ee9">{item.cityName}</Tag>
                  <Tag color="#108ee9">{item.countyName}</Tag><br />
                </div>
                <div className={styles.extra}>
                  <Avatar src={avatar} size="small" />
                发布机构:<a href="#">{item.busName}</a>
                创建于:<em>{moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}</em>
                </div>

              </div>
            </List.Item>
          )}
        />}
      </Card>}
      <AddActivity
        visible={modalVisible}
        closeHandle={closeHandle}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
        address={regionList}
        label={labelList}
        subject={subjectList}
      >
      </AddActivity>
      <GetActivityRealnameList
        visible={modalGetVisible}
        closeHandle={closeGetHandle}
        orgId={orgId}
      >
      </GetActivityRealnameList>
    </>
  );
};

const mapStateToProps = ({ listTravel, loading, HomeList }) => {
  return {
    listTravel,
    HomeList,
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(Subject);
