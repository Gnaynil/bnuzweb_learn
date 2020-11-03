
const data = {};
data.id = localStorage.getItem("userLoginId");
data.avatar = localStorage.getItem("userLoginAvatar");
data.phone = localStorage.getItem("userLoginPhone");
console.log(localStorage.getItem("userLoginId"));





export default data;


// import request from '@/utils/bas_request'
// import React, { useEffect, useState } from "react";

// async function getLoginInfo(params) {
//   return request(`/orgservice/v1/org-user/auth/getLoginInfo`, {
//     method: 'POST',
//   });
// }

// const Model = {
//   namespace: 'Logindata',
//   state: {
//     date: {}
//   },
//   effects: {
//     *fetch({ payload }, { put, call }) {
//       const data = yield call(getLoginInfo, { payload });
//       console.log(data, 2222);
//       if (data) {
//         yield put({
//           type: "getLogin",
//           payload: data
//         })
//       }
//     },

//   },
//   reducers: {
//     getLogin(state, action) {
//       return { ...state, date: action.payload };
//     }
//   }
// };


// useEffect(() => {
//   dispatch({
//     type: 'Logindata/fetch',
//   });
// }, []);
// if (date.user) {
//   localStorage.setItem("userLogin", date.user.id);
// }
// console.log(localStorage.getItem("userLoginId"));


// let result = {};
// const data = getLoginInfo({}).then(res => {
//   console.log(res);
//   result = res;
//   console.log(result);
//   if (result.user) {
//     localStorage.setItem("userLoginId", result.user.id);
//   }
// });
// console.log("333");
// console.log(localStorage.getItem("userLogin"));
// export default data;

// useEffect(() => {
//   dispatch({
//     type: 'list/fetch',
//     payload: {

//     }
//   });
// }, []);
