import React, { useState, useEffect, useRef } from 'react';
import { message, Modal, Form, Select, Input, Upload, Button, DatePicker, InputNumber } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import moment from 'moment';
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const CreateForm = (props) => {
  const { visible, closeHandle, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();
  const ItemMessage = JSON.parse(localStorage.getItem("ItemMessage"));
  //  const obj = [];
  // obj.push({ url: ItemMessage.cover });
  // // setfileUpload(obj);

  //小Bug 点击修改去掉图片再点进去没有显示出原来的图片
  const [fileUpload, setfileUpload] = useState([{
    uid: '-1',
    name: '已上传图片',
    status: 'done',
    url: ItemMessage.cover,
  }]);
  
  //给表单赋值
  useEffect(() => {
    form.setFieldsValue({
      ...ItemMessage,
      // orgId: ItemMessage.orgId,
      // orgActId: ItemMessage.id,
      // orgName: ItemMessage.busName,
      // provinceId: ItemMessage.provinceId,
      // cityId: ItemMessage.cityId,
      // countyId: ItemMessage.countyId,
      // label: ItemMessage.label,
      // subject: ItemMessage.subject,
      // type: ItemMessage.type,
      // status: "publish",
      // sellNum: 0,
      // name:ItemMessage.name,
      // price:ItemMessage.price,
      // itemNum:ItemMessage.itemNum,
      detail: BraftEditor.createEditorState(ItemMessage.detail),
      beginTime: moment(ItemMessage.beginTime),
      endTime: moment(ItemMessage.endTime),
    })
  }, [visible])


 


  //图片上传到服务器
  const handleUploadChange = info => {
    console.log(info);
    let picList = [...info.fileList];
    console.log(picList);
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
    console.log(picList);
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

  const myUploadFn = (param) => {
    const serverURL = 'http://119.29.92.83:8003/ossservice/v1/auth/file/upload'
    const xhr = new XMLHttpRequest
    const fd = new FormData()

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const jsonText = xhr.responseText;
      console.log(JSON.parse(jsonText));
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



  return (
    <div>
      <Modal
        title="添加活动实体"
        visible={visible}
        onOk={onSumit}
        onCancel={closeHandle}
        forceRender
        width={3000}
        confirmLoading={confirmLoading}
      >
        <Form
          {...formLayout}
          name="basic"
          form={form}
          onFinish={(value) => HandleFinish(value)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="机构ID"
            name="orgId"
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
            label="省份ID"
            hidden
            name="provinceId"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="城市ID"
            hidden
            name="cityId"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="区县ID"
            hidden
            name="countyId"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="标签"
            hidden
            name="label"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="分类"
            hidden
            name="subject"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="类型"
            hidden
            name="type"
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
              className="my-editor"
              // excludeControls="media"
              media={{
                accepts: {
                  video: false,
                  audio: false,
                },
                uploadFn: myUploadFn
              }}
              placeholder="请输入正文内容"
            />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
}

export default CreateForm;
