import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Row,
  Divider,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import styles from './style.less';

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

export const HomeList = (props) => {

  return (
    <div className={styles.standardList}>
      <Card bordered={false}>
        <Row>
          <Col sm={6} mxs={20}>
            <Info title="以发布课程" value="8" bordered />
          </Col>
          <Col sm={6} xs={20}>
            <Info title="已发布旅行" value="3" bordered />
          </Col>
          <Col sm={6} xs={20}>
            <Info title="已发布新闻" value="2" bordered />
          </Col>
          <Col sm={6} xs={20}>
            <Info title="已发布公告" value="2" />
          </Col>
        </Row>
      </Card>
      <Divider
        style={{
          margin: '20px 0 24px',
          backgroundColor:"#12B7F5",
          height:"2px",
          width:"2px",  
        }}
      />
    </div>
  );
};
export default connect(({ loading }) => ({
  loading: loading.models.listBasicList,
}))(HomeList);
