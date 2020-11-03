import React, { useState, useEffect, useRef } from 'react';
import { message, Modal, Form, Input, Upload, Button, InputNumber } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
// [{
//   uid: '-1',
//   name: '已上传图片',
//   status: 'done',
//   url: pic
// }]
const UpdateIndexCover = (props) => {
  const { visible, closeHandle, onFinish, confirmLoading, record, pic } = props;
  const [form] = Form.useForm();
  const [fileUpload, setfileUpload] = useState([]);
  useEffect(() => {
    form.setFieldsValue({
      ...record
    })
    setfileUpload([{
      uid: '-1',
      name: '已上传图片',
      status: 'done',
      url: pic
    }])
  }, [visible])
  //图片上传到服务器
  const handleUploadChange = info => {
    let picList = [...info.fileList];
    picList = picList.slice(-1);
    picList = picList.map(file => {
      if (file.response) {
        file.url = file.response.data.url;
      }
      return file;
    })
    setfileUpload(picList);
  }
  const Uploadprops = {
    action: 'http://119.29.92.83:8003/ossservice/v1/auth/file/upload',
    onChange: handleUploadChange,
  }


  const onSumit = () => {
    form.submit();
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const HandleFinish = (value) => {
    onFinish(value);
    form.resetFields();
    setfileUpload([])
  }



  return (
    <div>
      <Modal
        title="添加封面轮播图"
        visible={visible}
        onOk={onSumit}
        onCancel={closeHandle}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...formLayout}
          name="basic"
          form={form}
          onFinish={(value) => HandleFinish(value)}
          onFinishFailed={onFinishFailed}
        // initialValues={record}
        >
          <Form.Item
            label="ID"
            name="id"
            hidden
          >
            <Input />
          </Form.Item>
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
            <Input />
          </Form.Item>
          <Form.Item
            label="排序"
            name="sortOrder"
            rules={[
              {
                required: true,
                message: '请输入排序',
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="上传封面"
            name="pic"
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
            label="跳转链接"
            name="url"
            rules={[
              {
                required: true,
                message: '请输入跳转链接',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateIndexCover;
