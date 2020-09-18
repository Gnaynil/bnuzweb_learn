/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';
import { notification } from 'antd';


const errorHandler = function(error) {
  if (error.response) {

    if(error.response.status > 400){
      message.error(error.data.message ? error.data.message:error.data);
    }


  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    console.log(error.message);
    message.error("Network Error.");
  }

  throw error; // If throw. The error will continue to be thrown.

  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};
// http://public-api-v1.aspirantzhang.com
// http://120.25.124.250:8001
// 网易云:http://123.207.32.32:9001
const extendRequest = extend({ 
  errorHandler,
  prefix:'http://123.207.32.32:9001',
  // headers:{
  //   "Accept": "*/*",
  //   'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmctdXNlciIsImlhdCI6MTYwMDMzMDgxOSwiZXhwIjoxNjAwNDE3MjE5LCJpZCI6IjEyNjU0ODU4NDUwODc5MjQyMjYiLCJuYW1lIjoiY2hlbmR4In0.bqAd_YYtYTm_13JdBPWDuFfY86KYjH5JStLPD93WZBQ',
  // }

});
/**
 * 配置request请求时的默认参数
 */


export default extendRequest;
