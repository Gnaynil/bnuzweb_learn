import React, { useState, useEffect } from "react";
import { Collapse, Table,Pagination } from "antd";
import { connect } from 'umi';
import ProTable from '@ant-design/pro-table';
const { Panel } = Collapse;
const index = props => {
  const {
    dispatch,
    loading,
    OrderItem: { orderList },
    sellNum,
    itemNum,
    itemId,
  } = props;
  console.log(orderList)

  useEffect(() => {
    dispatch({
      type: 'OrderItem/get',
      payload: {
        item_id: itemId,
        current: 1,
        limit: 15
      },
    });
  }, []);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'receiver',
      key: 'receiver',
    },
    {
      title: '手机号',
      dataIndex: 'receiverMobile',
      key: 'receiverMobile',
    }
  ];


  const Header = (props) => {
    const { itemNum, sellNum } = props;
    return (
      <div>
        <strong style={{ "fontSize": "16px" }}>活动人数:{itemNum}人</strong>
        <strong style={{ "fontSize": "16px", "marginLeft": "20px" }}>已报名:{sellNum}人</strong><br />
      </div>
    )
  }



  return (
    <div>
      <Collapse ghost>
        <Panel header={<Header itemNum={itemNum} sellNum={sellNum} />} key="1">
          <ProTable
            bordered={false}
            columns={columns}
            dataSource={orderList}
            loading={loading}
            search={false}
            options={false}
            pagination={{
              defaultPageSize: 10,
              pageSizeOptions:[10,20,50,100]
            }}
          />
        </Panel>
      </Collapse>
    </div>
  )
}
const mapStateToProps = ({ OrderItem, loading }) => {
  return {
    OrderItem,
    loading: loading.models.HomeList,
  }
}
export default connect(mapStateToProps)(index);