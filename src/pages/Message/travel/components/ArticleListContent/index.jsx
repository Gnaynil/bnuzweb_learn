import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import { Tag } from 'antd';

const ArticleListContent = ({ data: { detail,busName, gmtCreate, provinceName, countyName, cityName,isPublish },avatar}) => (
  <div className={styles.listContent}>
    {/* <div className={styles.description}>{detail}</div> */}
    <div className={styles.description}>
      <Tag color="#108ee9">{provinceName}</Tag>
      <Tag color="#108ee9">{cityName}</Tag>
      <Tag color="#108ee9">{countyName}</Tag><br/>
      {/* 发布情况:{isPublish} */}
    </div>
    <div className={styles.extra}>
        <Avatar src={avatar} size="small" />
      发布机构:<a href="#">{busName}</a>
      创建于:<em>{moment(gmtCreate).format('YYYY-MM-DD HH:mm')}</em>
    </div>
    {/*     <div className={styles.extra}>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
 */}
  </div>
);

export default ArticleListContent;
