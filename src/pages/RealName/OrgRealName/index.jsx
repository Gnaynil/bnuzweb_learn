import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Form, Upload } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import { UploadOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-form'
const OrgRealName = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };

  //图片上传到服务器
  const [fileBusList, setFileBusList] = useState([]);
  const [fileLegalList, setFileLegalList] = useState([]);

  const handleBusChange = info => {
    console.log(info);
    let picList = [...info.fileList];
    picList = picList.slice(-1);
    picList = picList.map(file => {
      if (file.response) {
        file.url = file.response.data.url;
        //表单赋值
        form.setFieldsValue({
          busLicense: file.url
        })
      }
      return file;
    })
    setFileBusList(picList);
  }
  const UploadBusprops = {
    action: 'http://119.29.92.83:8003/ossservice/v1/auth/file/upload',
    onChange: handleBusChange,
  }

  const handleLegalChange = info => {
    console.log(info);
    let picList = [...info.fileList];
    picList = picList.slice(-1);
    picList = picList.map(file => {
      if (file.response) {
        file.url = file.response.data.url;
        //表单赋值
        form.setFieldsValue({
          legalPersonPic:file.url
        })
      }
      return file;
    })
    setFileLegalList(picList);
  }
  const UploadLegalprops = {
    action: 'http://119.29.92.83:8003/ossservice/v1/auth/file/upload',
    onChange: handleLegalChange,
  }




  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = values => {
    const { dispatch } = props;
    dispatch({
      type: 'orgRealName/submitOrgForm',
      payload: values,
    });
    //重置表单
    form.resetFields();
    setFileBusList([]);
    setFileLegalList([]);
  };

  const onFinishFailed = errorInfo => {
    // eslint-disable-next-line no-console
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = changedValues => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };


  return (
    <PageContainer>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            {...formItemLayout}
            label="机构名字"

            name="busName"
            rules={[
              {
                required: true,
                message: '请输入机构名字',
              },
            ]}
          >
            <Input placeholder="请输入机构名字" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="上传经营许可证"
            name="busLicense"
          >
            <Upload {...UploadBusprops} fileList={fileBusList} listType="picture">
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="法人姓名"
            name="legalPerson"
            rules={[
              {
                required: true,
                message: '请输入法人姓名',
              },
            ]}
          >
            <Input placeholder="请输入法人姓名" />
          </Form.Item>
          <Form.Item
          {...formItemLayout}
          label="上传身份证照片"
          name="legalPersonPic"
        >
          <Upload {...UploadLegalprops} fileList={fileLegalList} listType="picture">
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
          <Form.Item
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
            {/*       <Button
              style={{
                marginLeft: 8,
              }}
            >
              保存
            </Button> */}
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['orgRealName/submitOrgForm'],
}))(OrgRealName);
