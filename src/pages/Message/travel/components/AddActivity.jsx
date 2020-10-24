import React, { useState, useEffect } from 'react';
import { message, Modal, Form, Select, Input, Cascader, Button, DatePicker } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const CreateForm = (props) => {
  const { visible, closeHandle, onFinish, confirmLoading, address, label, subject } = props;
  const [form] = Form.useForm();


  //分类列表*
  const subjectList = [];
  for (let i = 0; i < subject.length; i++) {
    const obj = {
      'value': subject[i].id,
      'label': subject[i].name
    }
    subjectList.push(obj);
  }
  //*
  //标签列表*
  const labelList = [];
  for (let i = 0; i < label.length; i++) {
    const obj = {
      'value': label[i].id,
      'label': label[i].name
    }
    labelList.push(obj);
  }
  //*

  //地区列表*
  const provinceList = [];
  const countryList = [];
  const cityList = [];
  const province = [];
  const county = [];
  const city = [];
  for (let i = 0; i < address.length; i++) {
    switch (address[i].type) {
      case 0:
        province.push(address[i]);
        break;
      case 1:
        county.push(address[i]);
        break;

      case 2:
        city.push(address[i]);
        break;
      default:
        break;
    }
  }
  for (let i = 0; i < city.length; i++) {
    const obj = {
      'value': city[i].id,
      'label': city[i].name,
      'parentId': city[i].parentId,
    }
    cityList.push(obj);
  }
  for (let i = 0; i < county.length; i++) {
    const List = [];
    for (let j = 0; j < cityList.length; j++) {
      if (cityList[j].parentId == county[i].id) {
        List.push(cityList[j]);
      }
    }
    const obj = {
      'value': county[i].id,
      'label': county[i].name,
      'parentId': county[i].parentId,
      'children': List
    }
    countryList.push(obj);
  }
  for (let i = 0; i < province.length; i++) {
    const List = [];
    for (let j = 0; j < countryList.length; j++) {
      if (countryList[j].parentId == province[i].id) {
        List.push(countryList[j]);
      }
    }
    const obj = {
      'value': province[i].id,
      'label': province[i].name,
      'children': List
    }
    provinceList.push(obj);
  }
  //*


  const onSumit = () => {
    form.submit();
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const HandleFinish = (value) => {
    onFinish(value);
    form.resetFields();
  }

  return (
    <div>
      <Modal
        title="审核信息"
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
          initialValues={{
            type: 0
          }}
        >
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
            <Input />
          </Form.Item>
          <Form.Item
            label="地点"
            name="address"
            rules={[
              {
                required: true,
                message: '请输入地点',
              },
            ]}
          >
            <Cascader options={provinceList}></Cascader>
          </Form.Item>
          <Form.Item
            label="标签"
            name="label"
          rules={[
            {
              required: true,
              message: '请输入标签',
            },
          ]}
          >
            <Select
              showArrow
              style={{ width: '100%' }}
              options={labelList}
            />
          </Form.Item>
          <Form.Item
            label="分类"
            name="subject"
          rules={[
            {
              required: true,
              message: '请输入分类',
            },
          ]}
          >
            <Select
              showArrow
              style={{ width: '100%' }}
              options={subjectList}
            />

          </Form.Item>
          <Form.Item
            label="类型"
            name="type"
            hidden
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
}

export default CreateForm;
