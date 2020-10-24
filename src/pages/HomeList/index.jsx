import React, { useState, useEffect } from "react";
import { Image, Card, Col, Row } from "antd";
import { connect } from 'umi';
import styles from './style.less';

const index = props => {
  const {
    dispatch,
    listTravel: { listTravel, meta },
    listSubject:{listSubject}
  } = props;
  useEffect(() => {
    dispatch({
      type: 'listTravel/fetch',
      payload: {
        type: 0
      },
      current: meta.current,
      limit: meta.limit
    });
    dispatch({
      type: 'listSubject/fetch',
      payload: {
        type: 1
      },
      current: meta.current,
      limit: meta.limit
    });
  }, []);

  const Info = ({ title, value, bordered }) => (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );
  let totalSubject;
  let totalTravel;
  if(listSubject){
    totalSubject = listSubject.length;
  }else totalSubject=0;
  if(listTravel){
    totalTravel = listTravel.length;
  }else totalTravel=0;

  return (
    <div
      style={{

      }}
      className={styles.standardList}
    >
      <Card bordered={false}>
        <Row>
          <Col sm={8} mxs={18}>
            <Info title="已发布课程" value={totalSubject} bordered /> 
          </Col>
          <Col sm={8} xs={18}>
            <Info title="已发布旅行" value={totalTravel} bordered />
          </Col>
          <Col sm={8} xs={18}>
            <Info title="已发布新闻" value="2" bordered />
          </Col>

        </Row>
      </Card>
    </div>
  )
}
const mapStateToProps = ({ listTravel, loading,listSubject }) => {
  return {
    listTravel,
    listSubject,
    loading: loading.models.HomeList,
  }
}
export default connect(mapStateToProps)(index);