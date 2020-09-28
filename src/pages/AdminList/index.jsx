import React, { useState, useEffect } from "react";
import { Table, notification, Card } from "antd";
import { connect } from 'umi';
import { getDescribe,getData } from "./service";
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { set } from "numeral";
const index = props => {
  const {
    loading,
    dispatch,
    AdminList: { list },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'AdminList/fetch',
      //查询条件
      payload:{
        "status":0
      }
    });
  }, [1]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      key: 'id',
    },
    {
      title: '机构名称',
      dataIndex: 'busName',
      valueType: 'text',
      key: 'orgName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'legalPerson',
      valueType: 'text',
      key: 'price',
    },
  ]
  return (
    <PageContainer content="这是Admin页面">

      <ProTable
        columns={columns}
        dataSource={list.realnameInfo}
        rowKey="id"
      />

    </PageContainer>
  )
}
const mapStateToProps = ({ AdminList, loading }) => {
  return {
    AdminList,
    loading: loading.models.AdminList,
  }
}


export default connect(mapStateToProps)(index);