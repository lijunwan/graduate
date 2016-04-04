export const AUTO_COMPLETE = 'AUTO_COMPLETE';
import HttpRequest from 'superagent';
export function searchBooks(params){
  return dispatch => {
      HttpRequest.get('/api/book/autoComplete')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: AUTO_COMPLETE,
          data: resp.body
        });
    });
  };
}
