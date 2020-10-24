import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { Table, notification, Card } from "antd";
import { connect,history } from 'umi';
import { getData } from "./service";
// import data from '@/common/userconfig'


const index = ({ dispatch, list }) => {
  const [value, setValue] = useState('test');

  const handleChange = (value) => { setValue(value) };

  // console.log(data);
  const test = 0;
  const getinformation = () => {
    history.push("/list");
  }

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

  // if (test == 1) {
    return (

      <div>
        <Table columns={columns} dataSource={list.data} rowKey='id' />
      </div>
    )
  // }
//   else {
//     return (
//       <div>
//         <button onClick={getinformation}>11</button>
//       </div>
//     )
//   }
}

const mapStateToProps = ({ list }) => {
  // console.log(list);

  // console.log(list.data);
  // console.log(list);
  // console.log('333');
  return {
    list,
  }
};

export default connect(mapStateToProps)(index);