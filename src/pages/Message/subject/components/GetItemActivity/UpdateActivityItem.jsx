import React, { useState, useEffect } from 'react';
import { message, Form, Input, Upload, Button, DatePicker, InputNumber, Card,Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { updateActivity } from '../../service';
// import '/braft-editor/dist/index.css'
import 'braft-editor/dist/index.css'
import moment from 'moment';
import BraftEditor from 'braft-editor'
import { updateItem } from '../../service';
const UpdateActivityItem = (props) => {
  const {
    loading,
  } = props;
  const ItemMessage = JSON.parse(localStorage.getItem("ItemMessage"));

  const [form] = Form.useForm();
  const submitFormLayout = {
    wrapperCol: {
      sm: {
        span: 0,
        offset: 4
      },
      xl:{
        span: 4,
        offset: 6
      },
      xxl:{
        span: 4,
        offset: 11
      }
    },
  };
  const formLayout = {
    labelCol: {
      sm: {
        span: 0,
        offset: 0
      },
      xl:{
        span: 2,
        offset: 2
      },
      xxl:{
        span: 4,
        offset: 4
      }
    },
    wrapperCol: {
      sm: {
        span: 2,
        offset: 0
      },
      xl:{
        span: 5,
        offset: 0
      }
    },
  };

  const [fileUpload, setfileUpload] = useState([{
    uid: '-1',
    name: '已上传图片',
    status: 'done',
    url: ItemMessage.cover,
  }]);
  //图片上传到服务器
  const handleUploadChange = info => {
    console.log(info);
    let picList = [...info.fileList];
    // console.log(picList);
    picList = picList.slice(-1);
    picList = picList.map(file => {
      if (file.response) {
        file.url = file.response.data.url;
        // //表单赋值
        // form.setFieldsValue({
        //   cover: file.url
        // })
      }
      return file;
    })
    setfileUpload(picList);
  }
  const Uploadprops = {
    action: 'http://119.29.92.83:8003/ossservice/v1/auth/file/upload',
    onChange: handleUploadChange,
  }

  //富文本上传媒体
  const [editorState, SetEditorState] = useState(BraftEditor.createEditorState(ItemMessage.detail));
  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const editorHandleChange = (value) => {
    SetEditorState(value);
  }
  const preview = () => {
    setEditorModalVisible(true)
  }

  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      title: "全屏下不可预览",
      text: '预览',
      onClick: preview
    }
  ]
  const myUploadFn = (param) => {
    const serverURL = 'http://119.29.92.83:8003/ossservice/v1/auth/file/upload'
    const xhr = new XMLHttpRequest
    const fd = new FormData()

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const jsonText = xhr.responseText;
      // console.log(JSON.parse(jsonText));
      param.success({
        url: JSON.parse(jsonText).data.url

      })
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: '上传失败'
      })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }

  const BackToSubject = () => {
    history.back();
  }


  const onUpdateFinish = async (params) => {
    let setCover;
    if (params.cover.fileList != undefined) {
      if (params.cover.fileList.length == 0) {
        setCover = "http://chendx-file.oss-cn-shenzhen.aliyuncs.com/2020/10/22/00f77a99-9196-4f58-bcce-d5598c1899fbunloading.png";
      } else setCover = params.cover.fileList[0].url;
    }
    const result = await updateItem({
      ...params,
      detail: params.detail.toHTML(),
      cover: setCover
    });
    if (result) {
      history.back();
      message.success('修改成功');
    }
  }

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const HandleFinish = (value) => {
    onUpdateFinish(value);
    form.resetFields();
    setfileUpload([])
  }

  return (
    <PageContainer
      title="修改活动"
      extra={
        <div>
          <Button type="primary" onClick={BackToSubject}>返回上一页</Button>
        </div>
      }>
      <Card bordered={false} style={{ minWidth: 1500 }}>
        <Form
          {...formLayout}
          name="basic"
          form={form}
          onFinish={(value) => HandleFinish(value)}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ...ItemMessage,
            detail: BraftEditor.createEditorState(ItemMessage.detail),
            beginTime: moment(ItemMessage.beginTime),
            endTime: moment(ItemMessage.endTime),
          }}
        >
          <Form.Item
            label="机构ID"
            name="orgId"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ID"
            name="id"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="活动ID"
            name="orgActId"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="机构名字"
            name="orgName"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="发布情况"
            hidden
            name="status"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="活动名"
            name="name"

            rules={[
              {
                required: true,
                message: '请输入活动名',
              },
            ]}
          >
            <Input style={{ width: '200px' }} />
          </Form.Item>
          <Form.Item
            label="商品数量"
            name="itemNum"
            rules={[
              {
                required: true,
                message: '请输入商品数量',
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="销售数量"
            name="sellNum"
            hidden
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="活动价格"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入活动价格',
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="上传封面"
            name="cover"
            rules={[
              {
                required: true,
                message: '请上传图片'
              }
            ]}
          >
            <Upload {...Uploadprops} fileList={fileUpload} listType="picture">
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="开始时间"
            name="beginTime"
            rules={[
              {
                required: true,
                message: '请输入开始时间'
              }
            ]}
          >
            <DatePicker showTime />

          </Form.Item>
          <Form.Item
            label="结束时间"
            name="endTime"
            rules={[
              {
                required: true,
                message: '请输入结束时间'
              }
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="活动描述"
            name="detail"
          >
            <BraftEditor
              style={{ minWidth: 800 }}
              onChange={editorHandleChange}
              className="my-editor"

              media={{
                accepts: {
                  video: false,
                  audio: false,
                },
                uploadFn: myUploadFn
              }}
              extendControls={extendControls}
              placeholder="请输入正文内容"
            />
          </Form.Item>
          <Form.Item
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading} >
              提交
              </Button>
            <Button type="primary" onClick={() => { form.resetFields() }} style={{ marginLeft: 30 }}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="内容"
        forceRender
        visible={editorModalVisible}
        onOk={() => { setEditorModalVisible(false) }}
        onCancel={() => { setEditorModalVisible(false) }}
        width={850}
      >
        <div dangerouslySetInnerHTML={{ __html: editorState.toHTML() }}></div>
      </Modal>
    </PageContainer>
  )
}


const mapStateToProps = ({ listSubject, loading }) => {
  return {
    listSubject,
    loading: loading.models.AdminList,
  }
}
export default connect(mapStateToProps)(UpdateActivityItem);


