export const CREATE_ORDER = 'CREATE_ORDER';
export const GET_ORDER = 'GET_ORDER';
export const PAY_ORDER = 'PAY_ORDER';
export const GET_ORDER_INFO = 'GET_ORDER_INFO';
import HttpRequest from 'superagent';
export function createOrder(params){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/createOrder')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: CREATE_ORDER,
          data: resp.body
        });
    });
  };
}
export function getOrder(){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/getOrderList')
      .end(function(err,resp){
        dispatch({
          type: GET_ORDER,
          data: resp.body
        });
    });
  };
}
export function getOrderInfo(params){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/getOrderInfo')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: GET_ORDER_INFO,
          data: resp.body
        });
    });
  };
}
export function payOrder(params){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/payOrder')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: PAY_ORDER,
          data: resp.body
        });
    });
  };
}
