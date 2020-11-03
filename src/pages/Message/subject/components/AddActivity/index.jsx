import React, { useState, useEffect } from 'react';
import { message, Form, Select, Input, Cascader, Button, Card, Divider, Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { addActivity } from '../../service';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import style from './style.less'


const AddActivity = (props) => {
  const {
    loading,
    dispatch,
    listSubject: { regionList, labelList, subjectList },

  } = props;
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
  }, []);


  const [form] = Form.useForm();
  const submitFormLayout = {
    wrapperCol: {
      sm: {
        span: 0,
        offset: 4
      },
      xl: {
        span: 4,
        offset: 6
      },
      xxl: {
        span: 4,
        offset: 11
      }
    },
  };
  const formLayout = {
    labelCol: {
      sm: {
        span: 0,
        offset: 0
      },
      xl: {
        span: 2,
        offset: 1
      },
      xxl: {
        span: 4,
        offset: 4
      }
    },
    wrapperCol: {
      sm: {
        span: 2,
        offset: 0
      },
      xl: {
        span: 5,
        offset: 0
      }
    },
  };


  //类型列表
  const typeList = [
    {
      "value": 0,
      "label": "旅游"
    },
    {
      "value": 1,
      "label": "课题"
    }
  ];
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

  //富文本上传媒体(可写成组件)
  const [editorDetailState, SetEditorDetailState] = useState(BraftEditor.createEditorState());
  const [editorDetailModalVisible, setEditorDetailModalVisible] = useState(false);
  const [editorArrangementState, SetEditorArrangementState] = useState(BraftEditor.createEditorState());
  const [editorArrangementModalVisible, setEditorArrangementModalVisible] = useState(false);

  const [editorMatterState, SetEditorMatterState] = useState(BraftEditor.createEditorState());
  const [editorMatterModalVisible, setEditorMatterModalVisible] = useState(false);

  const editorDetailHandleChange = (value) => {
    SetEditorDetailState(value);
  }
  const editorArrangementHandleChange = (value) => {
    SetEditorArrangementState(value);
  }
  const editorMatterHandleChange = (value) => {
    SetEditorMatterState(value);
  }

  const previewDetail = () => {
    setEditorDetailModalVisible(true)
  }
  const previewArrangement = () => {
    setEditorArrangementModalVisible(true)
  }
  const previewMatter = () => {
    setEditorMatterModalVisible(true)
  }

  const extendDetailControls = [
    {
      key: 'custom-button',
      type: 'button',
      title: "全屏下不可预览",
      text: '预览',
      onClick: previewDetail
    }
  ]
  const extendArrangementControls = [
    {
      key: 'custom-button',
      type: 'button',
      title: "全屏下不可预览",
      text: '预览',
      onClick: previewArrangement
    }
  ]
  const extendMatterControls = [
    {
      key: 'custom-button',
      type: 'button',
      title: "全屏下不可预览",
      text: '预览',
      onClick: previewMatter
    }
  ]
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

  const BackToSubject = () => {
    history.back();
  }

  const onFinish = async (params) => {
    console.log(params);
    switch (params.address.length) {
      case 1:
        params.provinceId = params.address[0];
        params.cityId = -1;
        params.countyId = -1;
        break;
      case 2:
        params.provinceId = params.address[0];
        params.cityId = params.address[1];
        params.countyId = -1;
        break;
      case 3:
        params.provinceId = params.address[0];
        params.cityId = params.address[1];
        params.countyId = params.address[2];
        break;
      default:
        break;
    }
    // console.log(params.address.length);
    // if (params.address.length = 1) {
    //   params.provinceId = params.address[0];
    //   params.cityId = -1;
    //   params.countyId = -1;
    // }
    // if (params.address.length = 2) {
    //   params.provinceId = params.address[0];
    //   params.cityId = params.address[1];
    //   params.countyId = -1;
    // }
    // if (params.address.length = 3) {
    //   params.provinceId = params.address[0];
    //   params.cityId = params.address[1];
    //   params.countyId = params.address[2];
    // }
    console.log(params);
    delete params.address;
    const result = await addActivity({
      ...params,
      detail: params.detail.toHTML(),
      matter: params.matter.toHTML(),
      arrangement: params.arrangement.toHTML(),
    });

    if (result) {
      history.back();
      message.success('添加成功');
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
      title="添加活动"
      extra={
        <div>
          <Button type="primary" onClick={BackToSubject}>返回上一页</Button>
        </div>
      }>
      <Card bordered={false} style={{ minWidth: 1500 }}>
        <div>
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
              label="类型"
              name="type"
            >
              <Select
                showArrow
                style={{ width: 300 }}
                options={typeList}
                placeholder="请选择"
              />
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
              <Input style={{ width: 300 }} />
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
              <Cascader options={provinceList} style={{ width: 300 }}></Cascader>
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
                style={{ width: 300 }}
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
                // style={{ width: '100%' }}
                style={{ width: 300 }}
                options={subList}
                placeholder="请选择"
              />

            </Form.Item>
            <Divider />
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
                style={{ width: 800 }}
                onChange={editorDetailHandleChange}
                className="my-editor"
                media={{
                  accepts: {
                    video: false,
                    audio: false,
                  },
                  uploadFn: myUploadFn
                }}
                extendControls={extendDetailControls}
                placeholder="请输入正文内容"
              />
            </Form.Item>
            <Divider />
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
                style={{ width: 800 }}
                onChange={editorArrangementHandleChange}
                className="my-editor"
                media={{
                  accepts: {
                    video: false,
                    audio: false,
                  },
                  uploadFn: myUploadFn
                }}
                extendControls={extendArrangementControls}
                placeholder="请输入正文内容"
              />
            </Form.Item>
            <Divider />
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
                style={{ width: 800 }}
                onChange={editorMatterHandleChange}
                className="my-editor"
                media={{
                  accepts: {
                    video: false,
                    audio: false,
                  },
                  uploadFn: myUploadFn
                }}
                extendControls={extendMatterControls}
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
        </div>

      </Card>
      <Modal
        title="内容"
        forceRender
        visible={editorDetailModalVisible}
        onOk={() => { setEditorDetailModalVisible(false) }}
        onCancel={() => { setEditorDetailModalVisible(false) }}
        width={850}
      >
        <div dangerouslySetInnerHTML={{ __html: editorDetailState.toHTML() }}></div>
      </Modal>
      <Modal
        title="行程安排"
        forceRender
        visible={editorArrangementModalVisible}
        onOk={() => { setEditorArrangementModalVisible(false) }}
        onCancel={() => { setEditorArrangementModalVisible(false) }}
        width={850}
      >
        <div dangerouslySetInnerHTML={{ __html: editorArrangementState.toHTML() }}></div>
      </Modal>
      <Modal
        title="注意事项"
        forceRender
        visible={editorMatterModalVisible}
        onOk={() => { setEditorMatterModalVisible(false) }}
        onCancel={() => { setEditorMatterModalVisible(false) }}
        width={850}
      >
        <div dangerouslySetInnerHTML={{ __html: editorMatterState.toHTML() }}></div>
      </Modal>

    </PageContainer>
  )
}

const mapStateToProps = ({ listSubject, loading }) => {
  return {
    listSubject,
    loading: loading.models.AdminList,
  }
}

export default connect(mapStateToProps)(AddActivity);
