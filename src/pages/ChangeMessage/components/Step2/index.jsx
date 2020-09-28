import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input, Upload, message, Modal } from 'antd';
import { connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import {ProFormUploadButton} from '@ant-design/pro-form'
import styles from './index.less';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
//图片上传
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


const Step2 = (props) => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;


  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'changeMessage/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'changeMessage/saveCurrentStep',
        payload: 'info',
      });
    }
  };



  const onValidateForm = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: 'changeMessage/submitStepForm',
        payload: { ...data, ...values },
      });
    }
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;


  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{

      }}
    >
      <ProFormUploadButton
        extra="支持扩展名：.jpg .zip .doc .wps"
        listType = "picture"
        label="上传身份证正面"
        name="front_id"
        title="上传文件"
      />
      <ProFormUploadButton
        extra="支持扩展名：.jpg .zip .doc .wps"
        label="上传身份证反面"
        name="reverse_id"
        title="上传文件"
      />
      <Divider
        style={{
          margin: '24px 0',
        }}
      />
      <Form.Item
        style={{
          marginBottom: 8,
        }}
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
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ changeMessage, loading }) => ({
  submitting: loading.effects['changeMessage/submitStepForm'],
  data: changeMessage.step,
}))(Step2);
