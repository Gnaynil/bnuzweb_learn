import React from "react";
import styles from "./index.less";
import { List, Avatar, Table } from "antd";
import { connect } from 'umi';



const index = ({ list}) => {
  // const columns = [
  //   {
  //     title: 'ID',
  //     dataIndex: 'id',
  //     valueType: 'digit',
  //     key: 'id',
  //   },
  //   {
  //     title: '机构名称',
  //     dataIndex: 'orgName',
  //     valueType: 'text',
  //     key: 'orgName',
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //     valueType: 'digit',
  //     key: 'price',
  //   },
  // ]
  // const columns = [
  //   {
  //     title: 'ID',
  //     dataIndex: 'id',
  //     valueType: 'digit',
  //     key: 'id',
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     valueType: 'text',
  //     key: 'name',
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: 'Create Time',
  //     dataIndex: 'create_time',
  //     valueType: 'dateTime',
  //     key: 'create_time',
  //   },
  // ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
      key: 'name',
      render: (text) => <a>{text}</a>,
    }
  ]
  // const columns = [
  //   {
  //     title: 'BusName',
  //     dataIndex: 'busName',
  //     valueType: 'text',
  //     key: 'busName',
  //   },
  //   {
  //     title: 'BusCapital',
  //     dataIndex: 'busCapital',
  //     valueType: 'text',
  //     key: 'busCapital',
  //     render: (text) => <a>{text}</a>,
  //   },
  // ]
return (
  <div>
    <Table columns={columns} dataSource={list.result}    rowKey='id' />
  </div>
)
}

const mapStateToProps = ({ list }) => {
  
  console.log(list);
  // console.log('333');
  return {
    list,
  }
};

export default connect(mapStateToProps)(index);