export const CLIENT_INFO = 'CLIENT_INFO';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const CLIENT_INFO_UPDATE = 'CLIENT_INFO_UPDATE';
export const CLIENT_PWD_UPDATE = 'CLIENT_PWD_UPDATE';
export const PWD_STATUS = 'PWD_STATUS';
import HttpRequest from 'superagent';
//import { interceptorAction } from './interceptorAction';
//import { loginCode } from './loginCode';

// export function loadClientInfo() {
//   return dispatch => {
//     HttpRequest.get('/api/user/list')
//       .end(function(err,resp){
//       interceptorAction(err, resp);
//       if(resp.ok){
//         dispatch({
//           type: CLIENT_INFO,
//           data: resp.body
//         });
//       }
//     });
//   };
// }
export function checkLogin(params) {
  return dispatch => {
    console.log("????")
    HttpRequest.post('/api/user/login')
      .send(params)
      .end(function(err,resp){
       //let info=loginCode(err, resp);
        dispatch({
          type: CHECK_LOGIN,
          data: resp.body
        });
    });
  };
}

// export function logOut(params) {
//   return dispatch => {
//     HttpRequest.get('/api/user/logout')
//       .end(function (err, resp) {
//         console.log(err);
//         console.log(resp);
//         // location.href = '/portal/login';
//         //ocation.href = 'https://socialcredits.cn';
//       });
//   };
// }
// export function logOut() {
//   console.log("logout")
//   return dispatch => {
//     HttpRequest.get('/api/user/logout')
//       .end(function(err,resp){
//             console.log(resp); 
//     });
//   };
//}


