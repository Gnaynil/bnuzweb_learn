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

const AdminRealnameList = (props) => {
  const { visible, record, closeHandle, onFinish, confirmLoading } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    let statusValue;
    if (record) {
      switch (record.status) {
        case 0:
          statusValue = "待审核";
          break;
        case 1:
          statusValue = "待审核";
          break;
        case 2:
          statusValue = "审核失败";
          break;
        case 9:
          statusValue = "审核通过";
          break;
        default:
          break;
      }
      form.setFieldsValue({
        ...record,
        status: statusValue
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
            
            label="机构ID"
            name="orgId"
          >
            <Input  disabled/>
          </Form.Item>
          <Form.Item
            
            label="ID"
            name="id"
          >
            <Input  disabled/>
          </Form.Item>
          <Form.Item
            label="经营许可证"
            hidden
            name="busLicense"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="机构名称"
            hidden
            name="busName"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="法人名字"
            hidden
            name="legalPerson"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="法人照片"
            hidden
            name="legalPersonPic"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="原因"
            name="reason"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
          >
            <Select style={{ width: 120 }} >
{/*               <Option value="0">创建中</Option> */}
              <Option value="待审核">待审核</Option>
              <Option value="审核失败">审核失败</Option>
              <Option value="审核通过">审核通过</Option>
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
    AdminRealNameList: { list, meta },
  } = props;
  console.log(props);

  useEffect(() => {
    dispatch({
      type: 'AdminRealNameList/fetch',
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
      title: '机构名称',
      dataIndex: 'busName',
      valueType: 'text',
      key: 'busName',
    },
    {
      title: '经营许可证',
      dataIndex: 'busLicense',
      valueType: 'text',
      key: 'busLicense',
      render: (text) => <Image width={100} src={text} placeholder={<Image width={100} src={text} />} fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==" />
    },
    {
      title: '法人姓名',
      dataIndex: 'legalPerson',
      valueType: 'text',
      key: 'legalPerson',
    },
    {
      title: '身份证照片',
      dataIndex: 'legalPersonPic',
      valueType: 'text',
      key: 'legalPersonPic',
      render: (text) => <Image width={100} src={text} placeholder={<Image width={100} src={text} />} fallback="data:image/png;base64,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" />
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
      dataIndex: 'status',
      filters: true,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '待审核',
          status: 'Processing',
        },
        // 1: {
        //   text: '待审核',
        //   status: 'Processing',
        // },
        2: {
          text: '审核失败',
          status: 'Error',
        },
        9: {
          text: '审核通过',
          status: 'Success',
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
  const updateStatus = (record) => {
    setModalVisible(true);
    setRecord(record);
  };
  const closeHandle = () => {
    setModalVisible(false);
  };
  const onFinish = async (params) => {
    let statusNumber;
    switch(params.status){
      case "待审核":
        statusNumber = 0;
        break;
      case "审核失败":
        statusNumber = 2;
        break;
      case "审核通过":
        statusNumber = 9;
        break;
      default:
        break;
    }
    params.status = statusNumber;
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
      type: 'AdminRealNameList/fetch',
      //查询条件
      payload: {
        // "status":0
      },
      current: meta.current,
      limit: meta.limit
    });
  }
  const searchstatusHandle = (value) => {
    console.log(value);
    dispatch({
      type: 'AdminRealNameList/fetch',
      //查询条件
      payload: {
        "status": value
      },
      current: meta.current,
      limit: meta.limit
    });
  }
  const searchOrgIdHandle = (value) => {
    console.log(value);
    dispatch({
      type: 'AdminRealNameList/fetch',
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
          dataSource={list.realnameInfo}
          rowKey="id"
          loading={loading}
          search={false}
          headerTitle="审核机构列表"
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions:[5,10,20,50,100]
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

      <AdminRealnameList
        visible={modalVisible}
        closeHandle={closeHandle}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
      />
    </div>

  )
}
const mapStateToProps = ({ AdminRealNameList, loading }) => {
  return {
    AdminRealNameList,
    loading: loading.models.AdminList,
  }
}


export default connect(mapStateToProps)(index);