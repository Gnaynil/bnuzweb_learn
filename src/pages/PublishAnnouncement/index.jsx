// eslint-disable-next-line no-console
import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less';
import { connect } from 'umi';
const { confirm } = Modal;

const Announcement = props => {
  const { submitting } = props;
  const [value, setValue] = useState('');
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],
      ['link', 'image'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]

  }


  const onValueChange = (value) => {
    // console.log(value, 'value');
    setValue(value);
  }

  const submitConfirm = (value) => {
    if (value) {
      confirm({
        title: '你确定要发布这个公告吗?',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          const { dispatch } = props;
          console.log(value, '1111111111111');
          dispatch({
            type: 'annoucement/submitAnnoucement',
            payload: value,
          });
          setValue('');
        }
      })
    }
    else {
      Modal.error({
        title: '请输入内容'
      })
    }
  }


  return (
    <PageContainer>
      <Card>
        <ReactQuill
          value={value}
          placeholder="请输入公告"
          theme="snow"
          modules={modules}
          onChange={onValueChange}
        />
        <div style={{textAlign:'center',margin:'20px 0 0 0'}}>
          <Button
            type="primary"
            loading={submitting}
            onClick={() => { submitConfirm(value) }}
          >提交</Button>
        </div>

      </Card>
    </PageContainer>
  );
};
const mapStateToProps = ({ loading }) => {
  return {
    submitting: loading.effects['annoucement/submitAnnoucement'],
  }
}

export default connect(mapStateToProps)(Announcement);
