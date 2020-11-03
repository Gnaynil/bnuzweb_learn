import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Col, Form, List, Row, Select, Tag, Image, message, Popconfirm, Avatar, Alert } from 'antd';
import moment from 'moment';
import { PlusOutlined, SnippetsOutlined, ExclamationCircleOutlined, ZoomInOutlined } from '@ant-design/icons';
import { connect, history } from 'umi';
import styles from './style.less';
import GetActivityRealnameList from './components/GetActivityRealnameList';
import { addActivity } from './service';
const { confirm } = Modal;

const Subject = (props) => {
  const {
    loading,
    dispatch,
    visible,
    listSubject: { listSubject, meta },
    HomeList: { user }

  } = props;

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
        type: 0
      },
      current: meta.current,
      limit: meta.limit
    },[visible]);
    dispatch({
      type: 'HomeList/get',
    });
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

  const [modalGetVisible, setModalGetVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();


  //刷新活动列表
  const resetHandle = () => {
    dispatch({
      type: 'listSubject/fetch',
      //查询条件
      payload: {
        type: 0
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
    console.log(item);
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

  function DetailInfo(item) {
    Modal.info({
      title: '简介',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
      )
    })
  }
  function ArrangementInfo(item) {
    Modal.info({
      title: '行程安排',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.arrangement }}></div>
      )
    })
  }
  function MatterInfo(item) {
    Modal.info({
      title: '注意事项',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.matter }}></div>
      )
    })
  }


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
            <Button type="primary" onClick={() => AddItemActivity()}>
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
          dataSource={listSubject}
          pagination={{
            pageSize: 10
          }}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                <div>
                  <Button type="primary" className={styles.listItemButton} onClick={() => GetItemActivity(item)}>查看活动实体列表</Button>
                  <Button style={{ marginLeft: "15px", backgroundColor: "#FBFF2B" }} onClick={() => UpdateItemActivity(item)}>修改活动</Button>
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
                  <Button type="primary" onClick={() => { DetailInfo(item) }}><ZoomInOutlined />简介</Button>
                  <Button type="primary" onClick={() => { ArrangementInfo(item) }} style={{ marginLeft: "15px" }}><ZoomInOutlined />行程安排</Button>
                  <Button type="primary" onClick={() => { MatterInfo(item) }} style={{ marginLeft: "15px" }}><ZoomInOutlined />注意事项</Button>
                  <br /><br />
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
