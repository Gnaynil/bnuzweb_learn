import React, { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { Card, Button, Image, Carousel, Tag, List, message, Modal } from 'antd';
import {
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import AddIndexCover from './components/AddIndexCover'
import UpdateIndexCover from './components/UpdateIndexCover'
import { addCover, updateCover } from './service';
const { confirm } = Modal;


const listCover = (props) => {
  const {
    dispatch,
    loading,
    listCover: { listCover },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'listCover/fetch',
      payload: {

      },
    });
  }, [dispatch]);

  //添加轮播图
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const addCoverHandle = () => {
    setModalVisible(true);
  }
  const closeHandle = () => {
    setModalVisible(false);
  };
  const onFinish = async (params) => {
    console.log(params);
    setConfirmLoading(true);
    const result = await addCover({
      ...params,
      pic: params.pic.fileList[0].url
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
      type: 'listCover/fetch',
      payload: {

      },
    });
  }

  //修改轮播图
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [record, setRecord] = useState(undefined);
  const [pic, setPic] = useState(undefined);
  const UpdateCoverHandle = (item) => {
    setRecord(item);
    setPic(item.pic);
    setModalUpdateVisible(true);
  }

  const UpdateCloseHandle = () => {
    setModalUpdateVisible(false)
  }
  const onUpdateFinish = async (params) => {
    setConfirmLoading(true);
    if (params.pic.fileList != undefined) {
      let setCover;
      if (params.pic.fileList.length == 0) {
        message.error("图片上传失败");
        setModalUpdateVisible(false);
        setConfirmLoading(false);
      }
      else {
        setCover = params.pic.fileList[0].url;
        // setConfirmLoading(false);
        const result = await updateCover({
          ...params,
          pic: setCover
        });
        if (result) {
          setModalUpdateVisible(false);
          message.success('修改成功');
          resetHandle();
          setConfirmLoading(false);
        }
      }
    }
    else {
      const result = await updateCover({
        ...params,
      });
      if (result) {
        setModalUpdateVisible(false);
        message.success('修改成功');
        resetHandle();
        setConfirmLoading(false);
      }
    }
  }
  // 删除轮播图
  const DeleteCoverHandle = (id) => {
    confirm({
      title: '确认删除该图片吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      okType: 'danger',
      cancelText: '返回',
      onOk() {
        setConfirmLoading(true);
        dispatch({
          type: 'listCover/delete',
          payload: {

          },
          id: id
        });
        setConfirmLoading(false);
      },
    });
  }

  //查看轮播图样式
  const getCoverStyle = () => {
    console.log("GetCoverStyle");
  }

  return (
    <PageContainer
      extra={
        <div>
          <Button type="primary" onClick={addCoverHandle}>
            添加轮播图图片
        </Button>
          <Button type="primary" onClick={getCoverStyle} style={{ marginLeft: 30 }}>
            查看生成轮播图样式
        </Button>
        </div>
      }
    >
      <Card>
        <List
          itemLayout="vertical"
          dataSource={listCover}
          loading={loading}
          renderItem={item => (
            <List.Item
              key={item.id}
              extra={
                <a href={item.url}> <img
                  width={180}
                  alt="pic"
                  src={item.pic}
                  fallback="data:image/png;base64,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"
                  placeholder={
                    <img src={`${item.pic}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`} />
                  }
                /></a>
              }
            >
              <List.Item.Meta
                title={<a href={item.url}>{item.title}</a>}
                description={
                  <div>
                    排序:<span>
                      <Tag color="magenta" >{item.sortOrder}</Tag>
                    </span>
                    <div>
                      <Button style={{ backgroundColor: "#FBFF2B", marginTop: 20 }} onClick={() => UpdateCoverHandle(item)}>修改</Button>
                      <Button type="primary" danger style={{ marginLeft: "15px" }} onClick={() => DeleteCoverHandle(item.id)}>删除</Button>
                    </div>

                  </div>


                }
              />
              {item.content}
            </List.Item>
          )}
        />
      </Card>
      <AddIndexCover
        visible={modalVisible}
        closeHandle={closeHandle}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
      <UpdateIndexCover
        visible={modalUpdateVisible}
        closeHandle={UpdateCloseHandle}
        onFinish={onUpdateFinish}
        confirmLoading={confirmLoading}
        record={record}
        pic={pic}
      />
    </PageContainer>
  )
};
const mapStateToProps = ({ listCover, loading }) => {
  return {
    listCover,
    loading: loading.models.AdminList,
  }
}
export default connect(mapStateToProps)(listCover);
