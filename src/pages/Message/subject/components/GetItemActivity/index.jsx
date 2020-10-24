import React, { useState, useEffect } from 'react';
import { Modal, Form, Image, Card, List, Tag, Avatar, Button, message, Tooltip } from "antd";
import { connect } from 'umi';
import moment from 'moment';
import { RollbackOutlined, SnippetsOutlined, PayCircleOutlined, ZoomInOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '../../style.less';
import AddActivityItem from './AddActivityItem';
import UpdateActivityItem from './UpdateActivityItem';
import { addItem } from '../../service';
const { confirm } = Modal;


const GetItemActivity = (props) => {
  const {
    loading,
    dispatch,
    listSubject: { itemList },
    // HomeList: { user }
  } = props;
  const Itemmessage = JSON.parse(localStorage.getItem("ActMessage"))

  let avatar;
  // if (user.user) {
  //   avatar = user.user.avatar
  // }
  useEffect(() => {
    dispatch({
      type: 'listSubject/getItemActivityList',
      //查询条件
      payload: {
        orgActId: Itemmessage.id
      }
    });
  }, [1]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  //添加活动的Modal
  const closeHandle = () => {
    setModalVisible(false);
  };

  const onFinish = async (params) => {
    let setCover;
    console.log(params.cover.fileList);
    if (params.cover.fileList.length == 0) {
      setCover = "http://chendx-file.oss-cn-shenzhen.aliyuncs.com/2020/10/22/00f77a99-9196-4f58-bcce-d5598c1899fbunloading.png";
    } else setCover = params.cover.fileList[0].url;
    setConfirmLoading(true);
    const result = await addItem({
      ...params,
      detail: params.detail.toHTML(),
      cover: setCover
    });
    console.log(result);
    if (result) {
      setModalVisible(false);
      message.success('添加成功');
      resetHandle();
      setConfirmLoading(false);
    }
  }
  const resetHandle = () => {
    dispatch({
      type: 'listSubject/getItemActivityList',
      //查询条件
      payload: {
        orgActId: Itemmessage.id
      }
    });
  }


  const BackToHandle = () => {
    history.back();
  }
  const AddItemActivity = () => {
    setModalVisible(true);
  }
  const Money = (props) => {
    if (props.value == 0) {
      return (
        <div >
          <Tooltip title="活动价格"><strong style={{ "color": "#ff7a4d", "fontSize": "26px" }}><PayCircleOutlined />免费</strong></Tooltip>
        </div>

      )
    }
    else return (
      <div>
        <Tooltip title="活动价格"><strong style={{ "color": "#ff7a4d", "fontSize": "26px" }}><PayCircleOutlined />{props.value}元/人</strong></Tooltip>

      </div>
    )
  }
  //修改活动实体
  const UpdateItemActivity = (item) => {
    localStorage.setItem("ItemMessage", JSON.stringify(item));
    setModalUpdateVisible(true)
  }
  const closeUpdateHandle = () => {
    setModalUpdateVisible(false);
  };
  const onUpdateFinish = async (params) => {
    let setCover;
    console.log(params.cover.fileList);
    if (params.cover.fileList.length == 0) {
      setCover = "http://chendx-file.oss-cn-shenzhen.aliyuncs.com/2020/10/22/00f77a99-9196-4f58-bcce-d5598c1899fbunloading.png";
    } else setCover = params.cover.fileList[0].url;
    setConfirmLoading(true);
    const result = await addItem({
      ...params,
      detail: params.detail.toHTML(),
      cover: setCover
    });
    console.log(result);
    if (result) {
      setModalUpdateVisible(false);
      message.success('添加成功');
      resetHandle();
      setConfirmLoading(false);
    }
  }

  // 删除活动实体
  const DeleteItemActivity = (id) => {
    confirm({
      title: '确认删除该活动实体吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        setConfirmLoading(true);
        dispatch({
          type: 'listSubject/deleteItem',
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

  function DetailInfo(item) {
    Modal.info({
      title: '活动描述',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
      )
    })
  }


  return (
    <>
      <Card
        style={{
          marginTop: 24,
        }}
        title="活动实体列表"
        bordered={false}
        bodyStyle={{
          padding: '8px 32px 32px 32px',
        }}
        extra={
          <div>
            <Button type="primary" onClick={BackToHandle}>
              <RollbackOutlined />返回活动列表
            </Button>
            <Button type="primary" onClick={AddItemActivity} style={{ marginLeft: 30 }}>
              <SnippetsOutlined />添加活动实体
            </Button>
          </div>

        }
      >
        <List
          size="large"
          loading={loading}
          rowKey="id"
          itemLayout="vertical"
          dataSource={itemList}
          pagination={{
            pageSize: 10
          }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <Image
                  width={180}
                  alt="logo"
                  src={item.cover}
                />
              }
            >

              <List.Item.Meta
                description={
                  <div>
                    <Button style={{ backgroundColor: "#FBFF2B" }} onClick={() => UpdateItemActivity(item)}>修改活动</Button>
                    <Button type="primary" danger style={{ marginLeft: "15px" }} onClick={() => DeleteItemActivity(item.id)}>删除</Button>
                  </div>
                }
                title={item.name}
              />
              <div className={styles.listContent}>
                {/* <div className={styles.description} dangerouslySetInnerHTML={{ __html: item.detail }}></div> */}


                <div className={styles.description}>
                  <Button type="primary" onClick={() => { DetailInfo(item) }}><ZoomInOutlined />活动描述</Button>
                  <Money value={item.price} />
                  <strong style={{ "fontSize": "16px" }}>活动人数:{item.itemNum}人</strong>
                  <strong style={{ "fontSize": "16px", "marginLeft": "20px" }}>已报名:{item.sellNum}人</strong><br />
                  <Tooltip title="日程安排"><em>{moment(item.beginTime).format('YYYY-MM-DD HH:mm')}</em>&nbsp;~&nbsp;<em>{moment(item.endTime).format('YYYY-MM-DD HH:mm')}</em></Tooltip><br />
                </div>
                <div className={styles.extra}>
                  发布机构:<a href="#">{item.orgName}</a>
                  创建于:<em>{moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}</em>
                </div>

              </div>
            </List.Item>

          )}
        />
      </Card>
      <AddActivityItem
        visible={modalVisible}
        closeHandle={closeHandle}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
        Actmessage={Itemmessage}
      >
      </AddActivityItem>
      <UpdateActivityItem
        visible={modalUpdateVisible}
        closeHandle={closeUpdateHandle}
        onFinish={onUpdateFinish}
        confirmLoading={confirmLoading}
      >
      </UpdateActivityItem>
    </>
  )
}

const mapStateToProps = ({ listSubject, loading }) => {
  return {
    listSubject,
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(GetItemActivity);
