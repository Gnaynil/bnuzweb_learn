import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip, Cascader } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import { addressData } from '@/common/adress-data'


const Subject = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);

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
    dispatch({
      type: 'travel/submitRegularForm',
      payload: values,
    });
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
    <PageContainer content="subject.basic.description">
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
                message: '请输入课题人数',
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
                message: '请输入课题单价',
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

          <FormItem
            {...formItemLayout}
            label="活动地点"
            name = "address"
            >

            <Cascader
              options={addr}
              rules={[{ required: true, message: '请输入你的活动地点!' }]}
            />
            {/* <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入详细地址"
              rows={2}
            /> */}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="课题详情信息"
            name="messge"
            rules={[
              {
                required: true,
                message: '请输入课题详情信息',
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入课题详情信息"
              rows={4}
            />
          </FormItem>
          
          {/*  <FormItem
            {...formItemLayout}
            label="subject.standard.label"
            name="standard"
            rules={[
              {
                required: true,
                message: 'subject.standard.required',
              },
            ]}
          >
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="subject.standard.placeholder"
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                subject.client.label
                <em className={styles.optional}>
                  subject.form.optional
                  <Tooltip title="subject.label.tooltip">
                    <InfoCircleOutlined
                      style={{
                        marginRight: 4,
                      }}
                    />
                  </Tooltip>
                </em>
              </span>
            }
            name="client"
          >
            <Input placeholder="subject.client.placeholder" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                subject.invites.label
                <em className={styles.optional}>subject.form.optional</em>
              </span>
            }
            name="invites"
          >
            <Input placeholder="subject.invites.placeholder" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                subject.weight.label
                <em className={styles.optional}>subject.form.optional</em>
              </span>
            }
            name="weight"
          >
            <InputNumber placeholder="subject.weight.placeholder" min={0} max={100} />
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="subject.public.label"
            help="subject.label.help"
            name="publicType"
          >
            <div>
              <Radio.Group>
                <Radio value="1">subject.radio.public</Radio>
                <Radio value="2">subject.radio.partially-public</Radio>
                <Radio value="3">subject.radio.private</Radio>
              </Radio.Group>
              <FormItem
                style={{
                  marginBottom: 0,
                }}
                name="publicUsers"
              >
                <Select
                  mode="multiple"
                  placeholder="subject.publicUsers.placeholder"
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">subject.option.A</Option>
                  <Option value="2">subject.option.B</Option>
                  <Option value="3">subject.option.C</Option>
                </Select>
              </FormItem>
            </div>
          </FormItem> */}
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

const mapStateToProps = ({loading}) => {
  console.log(loading);
  
  return {
    submitting: loading.effects['subject/submitRegularForm'],
  }
}
export default connect(mapStateToProps)(Subject);
