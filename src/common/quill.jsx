import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './style.less';

const Quill = props => {
  const [quillValue, setQuillValue] = useState('');
  //富文本功能项
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
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  }

  const onValueChange = (value) => {
    console.log(value, 'value');
    setQuillValue(quillValue);
    
  }
  return (
    <ReactQuill
      value={quillValue}
      placeholder="添加内容"
      theme="snow"
      modules={modules}
      onChange={onValueChange}
    />
  )
}
export default Quill;