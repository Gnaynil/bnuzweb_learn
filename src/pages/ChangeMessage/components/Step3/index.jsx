import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { connect } from 'umi';
import styles from './index.less';

const Step3 = (props) => {
  const { dispatch } = props;
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'changeMessage/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        再转一笔
      </Button>
      <Button>查看账单</Button>
    </>
  );
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计两小时内到账"
      extra={extra}
      className={styles.result}
    >
    </Result>
  );
};

export default connect(({ changeMessage }) => ({
  data: changeMessage.step,
}))(Step3);
