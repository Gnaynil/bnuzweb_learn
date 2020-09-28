import React, { useState } from "react";
import styles from "./index.less";
import { Table, notification, Card } from "antd";
import { connect } from 'umi';
import { getData } from "./service";


const index = ({ list }) => {
  const [value, setValue] = useState('test');

  const handleChange = (value) => { setValue(value) };

  

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '机构名称',
      dataIndex: 'orgName',
      valueType: 'text',
      key: 'orgName',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      valueType: 'digit',
      key: 'price',
    },
  ]
  console.log(list.data);
  return (
    <div>
      <Table columns={columns} dataSource={list.data} rowKey='id' />

    </div>
  )
}

const mapStateToProps = ({ list }) => {
  console.log(list);

  // console.log(list.data);
  // console.log(list);
  // console.log('333');
  return {
    list,
  }
};

export default connect(mapStateToProps)(index);