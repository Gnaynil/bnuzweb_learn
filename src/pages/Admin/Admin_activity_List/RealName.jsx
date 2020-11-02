import React, { useState, useEffect } from 'react';
import { message, Form, Divider, Input, Button, Card, Collapse } from "antd";
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getDescribe, UpdateDescribe } from "./service";
import 'braft-editor/dist/index.css'
import { Tabs } from 'antd'
import BraftEditor from 'braft-editor'
const { Panel } = Collapse;
const { TabPane } = Tabs;
import './style.less'

const RealNameActivity = (props) => {
  const record = JSON.parse(localStorage.getItem("realNameRecord"));
  useEffect(() => {
    let isRealnameValue;
    if (record) {
      switch (record.isRealname) {
        case 0:
          isRealnameValue = "审核中";
          break;
        case 2:
          isRealnameValue = "审核失败";
          break;
        case 1:
          isRealnameValue = "审核通过";
          break;
        default:
          break;
      }
      form.setFieldsValue({
        ...record,
        isRealname: isRealnameValue
      })
    }
  })
  const [form] = Form.useForm();
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
  const formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };
  const BackToAdmin = () => {
    window.history.back();
  }

  const onFinish = async (params) => {
    console.log(params);
    const result = await UpdateDescribe({
      ...params,
      isRealname: 1
    });


    if (result) {
      message.success('审核成功');
      window.history.back()
    }
  }



  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };
  const HandleFinish = (value) => {
    onFinish(value);
    form.resetFields();
  }
  const RealNameFail = async () => {
    const data = form.getFieldValue();
    const result = await UpdateDescribe({
      ...data,
      isRealname: 2
    });
    if (result) {
      message.success('审核成功');
      window.history.back()
    }
  }

  return (
    <PageContainer
      title="审核活动"
      extra={
        <div>
          <Button type="primary" onClick={BackToAdmin}>返回上一页</Button>
        </div>
      }>
      <Card bordered={false}>
        <Collapse ghost>
          <Panel header="查看活动详细信息" key="1">
            <div className="ClassDetail">
              <div className="class_message">
                <div className="class_message-detail">
                  <div>课程名称：{record.name}</div>
                  <div>举办城市：{record.provinceName + record.cityName + record.countyName}</div>
                  <div>课程类型：{record.labelName + ' | ' + record.subjectName}</div>
                </div>
              </div>
            </div>
            <div className="class_detail">
              <div className="class_detail-tabs">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="课程简介" key="1" className="class_detail-tabpane">
                    <div dangerouslySetInnerHTML={{ __html: record.detail }}></div>
                  </TabPane>
                  <TabPane tab="课程安排" key="2" className="class_detail-tabpane">
                    <div dangerouslySetInnerHTML={{ __html: record.arrangement }}></div>
                  </TabPane>
                  <TabPane tab="注意事项" key="3" className="class_detail-tabpane">
                    <div dangerouslySetInnerHTML={{ __html: record.matter }}></div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Panel>
        </Collapse>

        <Divider />
        <Form
          {...formLayout}
          name="basic"
          form={form}
          onFinish={(value) => HandleFinish(value)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="城市id"
            hidden
            name="cityId"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="机构ID"
            hidden
            name="orgId"
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
            label="内容"
            name="detail"
            hidden

          >
            <Input />
          </Form.Item>
          <Form.Item
            label="行程安排"
            name="arrangement"
            hidden
          >
            <Input />
          </Form.Item>
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
            label="机构名称"
            name="orgName"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="活动名"
            name="name"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="原因"
            name="reason"
          >
            <Input />
          </Form.Item>
          <Form.Item
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" htmlType="submit">
              审核通过
            </Button>
            <Button danger type="primary" onClick={RealNameFail} style={{ marginLeft: 30 }}>
              审核失败
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  )
}


export default RealNameActivity;
