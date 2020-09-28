import React, { useState } from 'react';
import { Form, Button, Divider, Input, Select, Cascader } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import { addressData } from '@/common/adress-data'


const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};


//地点数据
const addr = [];
const province = Object.keys(addressData);
for (let item in province) {
  const key = province[item];
  const cityList = [];
  if (addressData[key].length > 0) {
    for (let item1 in addressData[key]) {
      const obj = {
        'value': addressData[key][item1],
        'label': addressData[key][item1]
      }
      cityList.push(obj);
    }
  }
  const obj = {
    'value': key,
    'label': key,
    'children': cityList
  }
  addr.push(obj);
}


const Step1 = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const { validateFields } = form;

  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'changeMessage/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'changeMessage/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };


  return (

    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={{
          data,
          address: ['北京市', '北京市'],
        }}
      >
        <Form.Item
          label="法人姓名"
          name="Name"
          rules={[
            {
              required: true,
              message: '请填写法人姓名',
            },
          ]}
        >
          <Input placeholder="法人姓名" />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="活动地点"
        >
          <Form.Item
            name="address"
            rules={[{ type: 'array', required: true, message: '请输入地址' }]}
          >
            <Cascader
              options={addr}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            noStyle
            name="detailed"
            rules={
              [
                {
                  required: true,
                  message: '请输入详细地址',
                },
              ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入详细地址"
              rows={2}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="联系人"
          name="contactName"
          rules={[
            {
              required: true,
              message: '请输入联系人姓名',
            },
          ]}
        >
          <Input placeholder="请输入联系人姓名" />
        </Form.Item>
        <Form.Item
          label="联系电话"
          name="phoneNumber"
          rules={[{ len:11,required: true, message: '请输入正确的联系电话' }]}
        >
          <Input placeholder="请输入联系人电话" style={{ width: '100%' }} />
        </Form.Item>
        <Divider
        style={{
          margin: '24px 0',
        }}
      />
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
    </>
  );
};

export default connect(({ changeMessage }) => ({
  data: changeMessage.step,
}))(Step1);
