import React, { useState, useEffect } from "react";
import { Image, message, Modal, Form, Select, Input, Button, Pagination } from "antd";
import { connect } from 'umi';
import { getDescribe, UpdateDescribe } from "./service";
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { set } from "numeral";

const { Search } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const { Option } = Select;
const AdminActivityRealnameList = (props) => {
  const { visible, record, closeHandle, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();


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

  }, [visible])
  const onSumit = () => {
    form.submit();
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };


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
          onFinish={onFinish}
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
            label="活动名"
            // hidden
            name="name"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item

            label="机构ID"
            name="orgId"
            hidden
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="ID"
            name="id"
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
            label="状态"
            name="isRealname"
          >
            <Select style={{ width: 120 }} >
              <Option value="审核中">审核中</Option>
              <Option value="审核通过">审核通过</Option>
              <Option value="审核失败" >审核失败</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}


const index = props => {
  const {
    loading,
    dispatch,
    AdminActivityList: { list, meta },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'AdminActivityList/fetch',
      //查询条件
      payload: {
        // "status":0
      },
      current: meta.current,
      limit: meta.limit
    });
  }, [1]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState(undefined);
  const columns = [
    {
      title: '审核ID',
      dataIndex: 'id',
      valueType: 'text',
      key: 'id',
    },
    {
      title: '机构ID',
      dataIndex: 'orgId',
      valueType: 'text',
      key: 'orgid',
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      valueType: 'text',
      key: 'name',
    },
    {
      title: '活动省份',
      dataIndex: 'provinceName',
      valueType: 'text',
      key: 'provinceName',
    },
    {
      title: '活动城市',
      dataIndex: 'cityName',
      valueType: 'text',
      key: 'cityName',
    },
    {
      title: '活动区县',
      dataIndex: 'countyName',
      valueType: 'text',
      key: 'countyName',
    },
    {
      title: '活动内容',
      dataIndex: 'detail',
      valueType: 'option',
      key: 'detail',
      render: (_, detail) => (
        <div>
          <a
            onClick={() => {
              DetailInfo(detail);
            }}
          >
          活动内容
        </a>
        </div>
      ),
    },
    {
      title: '行程安排',
      dataIndex: 'arrangement',
      valueType: 'option',
      key: 'arrangement',
      render: (_, arrangement) => (
        <div>
          <a
            onClick={() => {
              ArrangementInfo(arrangement);
            }}
          >
          行程安排
        </a>
        </div>
      ),
    },
    {
      title: '注意事项',
      dataIndex: 'matter',
      valueType: 'text',
      key: 'matter',
      render: (_, matter) => (
        <div>
          <a
            onClick={() => {
              MatterInfo(matter);
            }}
          >
          注意事项
        </a>
        </div>
      ),
    },
    {
      title: '标签',
      dataIndex: 'label',
      valueType: 'text',
      key: 'label',
      valueEnum: {
        1: {
          text: '古典',
        },
        2: {
          text: '现代',
        },
        4: {
          text: '好好学习',
        },
        5: {
          text: '科技',
        },
      },
    },
    {
      title: '分类',
      dataIndex: 'subject',
      valueType: 'text',
      key: 'subject',
      valueEnum: {
        1: {
          text: '游学',
        },
        2: {
          text: '参观',
        },
        3: {
          text: '体验',
        },
      },
    },
    {
      title: '活动类型',
      dataIndex: 'type',
      valueType: 'text',
      key: 'type',
      valueEnum: {
        0: {
          text: '旅游',
        },
        1: {
          text: '学习',
        },
      },
    },
    {
      title: "原因",
      dataIndex: 'reason',
      filters: false,
      valueType: 'text',
      key: 'reason'
    },
    {
      title: '状态',
      dataIndex: 'isRealname',
      filters: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '审核中',
          status: 'Processing',
        },
        1: {
          text: '审核通过',
          status: 'Success',
        },
        2: {
          text: '审核失败',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <div>
          <a
            onClick={() => {
              updateStatus(record);
            }}
          >
            审核
          </a>
        </div>
      ),
    },
  ];

  function DetailInfo(item) {
    Modal.info({
      title: '简介',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
      )
    })
  }
  function ArrangementInfo(item) {
    Modal.info({
      title: '行程安排',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.arrangement }}></div>
      )
    })
  }
  function MatterInfo(item) {
    Modal.info({
      title: '注意事项',
      width: "1100px",
      content: (
        <div dangerouslySetInnerHTML={{ __html: item.matter }}></div>
      )
    })
  }

  const updateStatus = (record) => {
    setModalVisible(true);
    setRecord(record);
  };
  const closeHandle = () => {
    setModalVisible(false);
  };
  const onFinish = async (params) => {
    let isRealnameNumber;
    switch (params.isRealname) {
      case "审核中":
        isRealnameNumber = 0;
        break;
      case "审核失败":
        isRealnameNumber = 2;
        break;
      case "审核通过":
        isRealnameNumber = 1;
        break;
      default:
        break;
    }
    params.isRealname = isRealnameNumber;
    setConfirmLoading(true);
    const result = await UpdateDescribe(params);


    if (result) {
      setModalVisible(false);
      message.success('审核成功');
      resetHandle();
      setConfirmLoading(false);
    }
  }
  const resetHandle = () => {

    dispatch({
      type: 'AdminActivityList/fetch',
      //查询条件
      payload: {
        // "status":0
      },
      current: meta.current,
      limit: meta.limit
    });
  }
  // const searchstatusHandle = (value) => {
  //   console.log(value);
  //   dispatch({
  //     type: 'AdminActivityList/fetch',
  //     //查询条件
  //     payload: {
  //       "status": value
  //     },
  //     current: meta.current,
  //     limit: meta.limit
  //   });
  // }
  const searchOrgIdHandle = (value) => {
    console.log(value);
    dispatch({
      type: 'AdminActivityList/fetch',
      //查询条件
      payload: {
        "orgId": value
      },
      current: meta.current,
      limit: meta.limit
    });
  }

  return (
    <div>
      <PageContainer>
        <ProTable
          columns={columns}
          dataSource={list.activityRealnameList}
          rowKey="id"
          loading={loading}
          search={false}
          headerTitle="审核机构列表"
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: [5, 10, 20, 50, 100]
          }}
          options={{
            density: false,
            fullScreen: false,
            reload: () => {
              resetHandle();
            },
            setting: false,
          }}
          toolBarRender={() => [

            <Input.Group >
              <Search
                placeholder="搜索机构ID"
                onSearch={(value) => searchOrgIdHandle(value)}
                style={{ width: 200 }}
                allowClear
              />
              {/* <Select placeholder="搜索状态" style={{ width: 120 }} onChange={(value) => searchstatusHandle(value)}>
                <Option value="0">0:创建中</Option>
                <Option value="1">1:待审核</Option>
                <Option value="2" >2:审核失败</Option>
                <Option value="9">9:审核成功</Option>
              </Select>
 */}
            </Input.Group>,
            <Button onClick={resetHandle}>查看全部信息</Button>,
          ]}
        />

      </PageContainer>

      <AdminActivityRealnameList
        visible={modalVisible}
        closeHandle={closeHandle}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
    </div>

  )
}
const mapStateToProps = ({ AdminActivityList, loading }) => {
  return {
    AdminActivityList,
    loading: loading.models.AdminActivityList,
  }
}


export default connect(mapStateToProps)(index);