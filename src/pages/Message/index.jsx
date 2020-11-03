import React, { Component} from 'react';
import { Input} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import Header from '@/pages/HomeList'
import styles from './style.less';

class Search extends Component {
  handleTabChange = (key) => {
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;


    switch (key) {
      case 'subject':
        history.push(`${url}/subject`);
        break;

      case 'travel':
        history.push(`${url}/travel`);
        break;

      case 'news':
        history.push(`${url}/news`);
        break;

      default:
        break;
    }
  };
  handleFormSubmit = (value) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');

    if (tabKey && tabKey !== '/') {
      return tabKey;
    }

    return 'articles';
  };

  render() {
    const tabList = [
      {
        key: 'subject',
        tab: '课题',
      },
      {
        key: 'travel',
        tab: '旅游',
      },
      {
        key: 'news',
        tab: '新闻',
      },
    ];
    const mainSearch = (
      <div>
        <Header></Header>
      </div>
    );
    const { children } = this.props;
    return (
      <PageHeaderWrapper
        content={mainSearch}
        tabList={tabList}
        rowKey="key"
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Search;
