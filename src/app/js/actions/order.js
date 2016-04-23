export const CREATE_ORDER = 'CREATE_ORDER';
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