import React, { useState, useEffect } from 'react';
import { Modal, Form, Image, Card, List, Button, message, Tooltip, Tabs, Collapse } from "antd";
import { connect, history } from 'umi';
import moment from 'moment';
import { RollbackOutlined, SnippetsOutlined, PayCircleOutlined, ZoomInOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '../../style.less';
import AddActivityItem from './AddActivityItem';
import './index.less'
import { addItem } from '../../service';
import OrderItem from '../../../../OrderItem'
const { confirm } = Modal;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const Activity = (props) => {
  const { record } = props;
  return (
    <Card>
      <Collapse ghost>
        <Panel header="查看活动详细信息" key="1">
          <div className="ClassDetail">
            <div className="class_message">
              <div className="class_message-detail">
                <div>课程名称：{record.name}</div>
                <div>举办城市：{record.provinceName + record.cityName + record.countyName}</div>
                <div>课程类型：{record.labelName + ' | ' + record.subjectName}</div>
              </div>
            </div>
          </div>
          <div className="class_detail">
            <div className="class_detail-tabs">
              <Tabs defaultActiveKey="1">
                <TabPane tab="课程简介" key="1" className="class_detail-tabpane">
                  <div dangerouslySetInnerHTML={{ __html: record.detail }}></div>
                </TabPane>
                <TabPane tab="课程安排" key="2" className="class_detail-tabpane">
                  <div dangerouslySetInnerHTML={{ __html: record.arrangement }}></div>
                </TabPane>
                <TabPane tab="注意事项" key="3" className="class_detail-tabpane">
                  <div dangerouslySetInnerHTML={{ __html: record.matter }}></div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Panel>
      </Collapse>
    </Card>
  )
}

const GetItemActivity = (props) => {
  const {
    loading,
    dispatch,
    listSubject: { itemList },
  } = props;
  const Itemmessage = JSON.parse(localStorage.getItem("ActMessage"))

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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  //添加活动的Modal
  const closeHandle = () => {
    setModalVisible(false);
  };

  const onFinish = async (params) => {
    console.log(params);
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
    window.history.back()
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
    history.push("/update_activity_item");
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
      <Activity record={Itemmessage} />
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
                  fallback="data:image/png;base64,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"
                  placeholder={
                    <Image src={`${item.cover}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`} />
                  }
                />
              }
            >

              <List.Item.Meta
                title={item.name}
              />
              <div className={styles.listContent}>
                {/* <div className={styles.description} dangerouslySetInnerHTML={{ __html: item.detail }}></div> */}
                <div className={styles.description}>
                  <Button type="primary" onClick={() => { DetailInfo(item) }}><ZoomInOutlined />活动描述</Button>
                  <Money value={item.price} />
                  <OrderItem 
                    itemNum={item.itemNum}
                    sellNum={item.sellNum} 
                    itemId = {item.id}
                  />
                </div>
                <div className={styles.extra}>
                  <Tooltip title="日程安排"><em>{moment(item.beginTime).format('YYYY-MM-DD HH:mm')}</em>&nbsp;~&nbsp;<em>{moment(item.endTime).format('YYYY-MM-DD HH:mm')}</em></Tooltip><br />
                  发布机构:<a href="#">{item.orgName}</a>
                  创建于:<em>{moment(item.gmtCreate).format('YYYY-MM-DD HH:mm')}</em>
                </div>
                <div>
                  <Button style={{ backgroundColor: "#FBFF2B" }} onClick={() => UpdateItemActivity(item)}>修改活动</Button>
                  <Button type="primary" danger style={{ marginLeft: "15px" }} onClick={() => DeleteItemActivity(item.id)}>删除</Button>
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
