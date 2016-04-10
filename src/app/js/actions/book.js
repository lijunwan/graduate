export const AUTO_COMPLETE = 'AUTO_COMPLETE';
export const GET_BOOK_ON_SALE = 'GET_BOOK_ON_SALE';
export const GET_BOOK_NEW = 'GET_BOOK_NEW';
export const GET_BOOK_INFO = 'GET_BOOK_INFO';
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

export function getBooksNew(){
  return dispatch => {
      HttpRequest.get('/api/book/bookNew')
      .end(function(err,resp){
        dispatch({
          type: GET_BOOK_NEW,
          data: resp.body
        });
    });
  };
}
export function getBookInfo(params){
  return dispatch => {
      HttpRequest.get('/api/book/bookInfo')
      .query({'bookId': params})
      .end(function(err,resp){
        dispatch({
          type: GET_BOOK_INFO,
          data: resp.body
        });
    });
  };
}
