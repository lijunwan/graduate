export const SEARCH_BOOKS = 'SEARCH_BOOKS';
import HttpRequest from 'superagent';
export function searchBooks(params){
  return dispatch => {
      HttpRequest.get('/api/book')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: SEARCH_BOOKS,
          data: resp.body
        });
    });
  };
}
