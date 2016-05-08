export const CHECK_LOGIN = 'CHECK_LOGIN';
export const CHECK_PHONE = 'CHECK_PHONE';
export const CREATE_USER = 'CREATE_USER';
export const ADD_BOOK = 'ADD_BOOK';
export const GET_SHOPCARTS = 'GET_SHOPCARTS';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';
export const GET_USERINFO = 'GET_USERINFO';
export const UPDATE_PASS = 'UPDATE_PASS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const GET_ADDRESS = 'GET_ADDRESS';
export const DEL_ADDRESS = 'DEL_ADDRESS';
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
export function getLog(){
  return dispatch => {
    HttpRequest.get('/api/log')
      .end(function(err,resp){
       //let info=loginCode(err, resp);
        dispatch({
          type: CHECK_LOGIN,
          data: resp.body
        });
    });
  };
}
export function checkPhone(params){
  return dispatch => {
    dispatch({
      type: CHECK_PHONE,
      data: {status:'wating'}
    });
    HttpRequest.get('/api/user/phone')
      .query(params)
      .end(function(err,resp){
       //let info=loginCode(err, resp);
        dispatch({
          type: CHECK_PHONE,
          data: resp.body
        });
    });
  };
}
export function resetUser() {
  return dispatch => {
    dispatch({
      type:CREATE_USER,
      data:{}
    });
  };
}
export function resetPhone(){
  return dispatch => {
    dispatch({
      type: CHECK_PHONE,
      data: {}
    });
  };
}
export function createUser(params) {
  return dispatch => {
    HttpRequest.post('/api/user/register')
      .send(params)
      .end(function(err,resp){
        dispatch({
          type:CREATE_USER,
          data: resp.body
        });
    });
  };
}
export function logOut() {
  console.log("logout")
  return dispatch => {
    HttpRequest.del('/api/user/logout')
      .end(function(err,resp){
        window.location="/"
    });
  };
}
export function updateUserInfo(params) {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/undateUserInfo')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: UPDATE_USERINFO,
          data: resp.body
        });
        window.location.reload();
    });
  };
}
export function getUserInfo() {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/getUserInfo')
      .end(function(err,resp){
        dispatch({
          type: GET_USERINFO,
          data: resp.body
        });
    });
  };
}
export function addBookIntoCars(params){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/addShopCarts')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: ADD_BOOK,
          data: resp.body
        });
    //  window.location='/shopCart';
    });
  };
}
export function getShopCartInfo() {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/getShopCarts')
      .end(function(err,resp){
        dispatch({
          type: GET_SHOPCARTS,
          data: resp.body
        });
    });
  };
}
export function updateShopCart(params) {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/updateShopCart')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: GET_SHOPCARTS,
          data: resp.body
        });
    });
  };
}
export function delShopCart(params) {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/delShopCart')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: GET_SHOPCARTS,
          data: resp.body
        });
    });
  };
}
export function updatePassWord(params) {
  return dispatch => {
      HttpRequest.post('/api/user/authorization/updatePassWord')
      .send(params)
      .end(function(err,resp){
        dispatch({
          type: UPDATE_PASS,
          data: resp.body
        });
    });
  };
}
export function addAddress(params) {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/addAddress')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: ADD_ADDRESS,
          data: resp.body
        });
    });
  };
}
export function getAddress() {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/getAddress')
      .end(function(err,resp){
        dispatch({
          type: GET_ADDRESS,
          data: resp.body
        });
    });
  };
}
export function delAddress(params) {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/delAddress')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: DEL_ADDRESS,
          data: resp.body
        });
    });
  };
}
