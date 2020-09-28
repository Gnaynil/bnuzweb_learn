import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip, Cascader } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { useEffect, useRef,useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { addressData } from '@/common/adress-data';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Subject = props => {
  const [quillValue, setQuillValue] = useState('');
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);

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

  //富文本功能项
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],
      ['link', 'image'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]

  }


  const onQuillValueChange = (value) => {
    // console.log(value, 'value');
    setQuillValue(quillValue);
  }
  //表单布局
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
    console.log(values, "values");
    dispatch({
      type: 'subject/submitRegularForm',
      payload: values,
    });
    form.resetFields();
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
            address: ['北京市', '北京市'],
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label="课题名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入课题名称',
              },
            ]}
          >
            <Input placeholder="课题名称" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课题人数"
            name="people"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                message: '请输入正确的课题人数',
              },
            ]}
          >
            <Input placeholder="课题人数" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="课题单价"
            name="price"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^[1-9]\d*$/, "g"),
                message: '请输入正确的课题单价',
              },
            ]}
          >
            <Input placeholder="课题单价" suffix="RMB" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="活动时间"
            name="date"
            rules={[
              {
                required: true,
                message: '请输入活动时间',
              },
            ]}
          >
            <RangePicker
              style={{
                width: '100%',
              }}
              placeholder={['开始时间', '结束时间']}
            />
          </FormItem>
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

          <FormItem
            {...formItemLayout}
            label="课题详情信息"
            name="messge"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入课题详情信息',
            //   },
            // ]}
          >
            <ReactQuill
              value={quillValue}
              placeholder="请输入课题详情信息"
              theme="snow"
              modules={modules}
              onChange={onQuillValueChange}
            />
          </FormItem>
          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
};

const mapStateToProps = ({ loading }) => {
  return {
    submitting: loading.effects['travel/submitRegularForm'],
  }
}
export default connect(mapStateToProps)(Subject);
