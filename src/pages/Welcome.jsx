import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';
import HomeList from './HomeList';
import OrgInfo from './OrgUserInfo';
export default () => (
  <PageContainer title="我的信息">
 {/*    <Card>
      <Alert
        message="更快更强的重型组件，已经发布。"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card> */}
    {/* <HomeList /> */}
    <OrgInfo/>
    
  </PageContainer>
);
