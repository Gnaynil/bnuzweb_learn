// eslint-disable-next-line no-console
import React, { useState, useEffect, useRef } from 'react';
import { message, Form, Modal, Input, Upload, Button, Card } from "antd";
import { connect, history } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { addNews } from './service';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'
import './index.less'



const News = props => {
  const {
    loading
  } = props;
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
      xl: {
        span: 2,
        offset: 1
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

  //图片上传到服务器
  const [fileUpload, setfileUpload] = useState([]);
  const handleUploadChange = info => {
    let picList = [...info.fileList];
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
  const [editorState, SetEditorState] = useState(BraftEditor.createEditorState());
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
        msg: 'unable to upload.'
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





  const onFinish = async (params) => {
    console.log(params);
    let setCover;
    console.log(params.cover.fileList);
    if (params.cover.fileList.length == 0) {
      setCover = "http://chendx-file.oss-cn-shenzhen.aliyuncs.com/2020/10/22/00f77a99-9196-4f58-bcce-d5598c1899fbunloading.png";
    } else setCover = params.cover.fileList[0].url;
    const result = await addNews({
      ...params,
      content: params.content.toHTML(),
      cover: setCover
    });

    if (result) {
      history.push("/message/news");
      message.success('添加成功');
    }
  }
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const HandleFinish = (value) => {
    onFinish(value);
    form.resetFields();
  }


  return (
    <PageContainer>
      <Card
        style={{ minWidth: 1500 }}
      >
        <Form
          {...formLayout}
          name="basic"
          form={form}
          onFinish={(value) => HandleFinish(value)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}

          >
            <Input style={{ width: 300 }} />
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
            label="内容"
            name="content"

            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}

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
      </Card>
    </PageContainer>

  );
};
const mapStateToProps = ({ loading }) => {
  return {
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(News);
