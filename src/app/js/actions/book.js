export const AUTO_COMPLETE = 'AUTO_COMPLETE';
export const GET_BOOK_ON_SALE = 'GET_BOOK_ON_SALE';
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
export function getBooksOnSale(){
  return dispatch => {
      HttpRequest.get('/api/book/bookOnSale')
      .end(function(err,resp){
        dispatch({
          type: GET_BOOK_ON_SALE,
          data: resp.body
        });
    });
  };
}
