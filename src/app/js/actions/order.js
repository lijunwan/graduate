export const CREATE_ORDER = 'CREATE_ORDER';
export const GET_ORDER = 'GET_ORDER';
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

