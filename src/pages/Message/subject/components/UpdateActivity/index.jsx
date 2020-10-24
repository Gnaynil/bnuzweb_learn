import React, { useState, useEffect } from 'react';
import { message, Form, Select, Input, Cascader, Button, Card } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { updateActivity } from '../../service';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'


const UpdateActivity = (props) => {
  const {
    loading,
    dispatch,
    listSubject: { regionList, labelList, subjectList },
  } = props;
  const formValue = JSON.parse(localStorage.getItem("ItemMessage"));

  useEffect(() => {
    dispatch({
      type: 'listSubject/getRegion',
      //查询条件
      payload: {

      }
    });
    dispatch({
      type: 'listSubject/getLabel',
      //查询条件
      payload: {

      }
    });
    dispatch({
      type: 'listSubject/getSubject',
      //查询条件
      payload: {

      }
    });
    // form.setFieldsValue({
    //   ...formValue,
    // })
  }, []);


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

  //分类列表*
  const subList = [];
  for (let i = 0; i < subjectList.length; i++) {
    const obj = {
      'value': subjectList[i].id,
      'label': subjectList[i].name
    }
    subList.push(obj);
  }
  //*
  //标签列表*
  const labList = [];
  for (let i = 0; i < labelList.length; i++) {
    const obj = {
      'value': labelList[i].id,
      'label': labelList[i].name
    }
    labList.push(obj);
  }
  //*

  //地区列表*
  const provinceList = [];
  const countryList = [];
  const cityList = [];
  const province = [];
  const county = [];
  const city = [];
  for (let i = 0; i < regionList.length; i++) {
    switch (regionList[i].type) {
      case 0:
        province.push(regionList[i]);
        break;
      case 1:
        county.push(regionList[i]);
        break;

      case 2:
        city.push(regionList[i]);
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

  //富文本上传媒体
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
        msg: '上传失败'
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

  const BackToSubject = () => {
    history.back();
  }

  const onFinish = async (params) => {
    console.log(params);
    params.provinceId = params.address[0];
    params.cityId = params.address[1];
    params.countyId = params.address[2];
    delete params.address;

    const result = await updateActivity({
      ...params,
      detail: params.detail.toHTML(),
      matter: params.matter.toHTML(),
      arrangement: params.arrangement.toHTML(),
    });

    if (result) {
      history.back();
      message.success('修改成功');
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
    <PageContainer
      title="修改活动"
      extra={
        <div>
          <Button type="primary" onClick={BackToSubject}>返回上一页</Button>
        </div>
      }>
      <Card bordered={false}>
        <Form
          {...formLayout}
          name="basic"
          form={form}
          onFinish={(value) => HandleFinish(value)}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ...formValue,
            address: [formValue.provinceId, formValue.cityId, formValue.countyId],
            detail: BraftEditor.createEditorState(formValue.detail),
            arrangement: BraftEditor.createEditorState(formValue.arrangement),
            matter: BraftEditor.createEditorState(formValue.matter)

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
              options={labList}
              placeholder="请选择"
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
              options={subList}
              placeholder="请选择"
            />

          </Form.Item>
          <Form.Item
            label="类型"
            name="type"
            hidden
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="内容"
            name="detail"
            rules={[
              {
                required: true,
                message: '请输入内容',
              },
            ]}
          >
            <BraftEditor
              className="my-editor"
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
          <Form.Item
            label="行程安排"
            name="arrangement"
            rules={[
              {
                required: true,
                message: '请输入行程安排',
              },
            ]}

          >
            <BraftEditor
              className="my-editor"
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
          <Form.Item
            label="注意事项"
            name="matter"
            rules={[
              {
                required: true,
                message: '请输入注意事项',
              },
            ]}

          >
            <BraftEditor
              className="my-editor"
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
      </Card>
    </PageContainer>
  )
}

const mapStateToProps = ({ listSubject, loading }) => {
  return {
    listSubject,
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(UpdateActivity);
