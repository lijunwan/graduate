export const AUTO_COMPLETE = 'AUTO_COMPLETE';
export const GET_BOOK_ON_SALE = 'GET_BOOK_ON_SALE';
export const GET_BOOK_NEW = 'GET_BOOK_NEW';
export const GET_BOOK_INFO = 'GET_BOOK_INFO';
export const SEARCH_BOOK = 'SEARCH_BOOK';
export const GET_BOOKMENU = 'GET_BOOKMENU';
export const SEARCH_BOOK_BYTYPE = 'SEARCH_BOOK_BYTYPE';
export const EVALUATION_BOOK = 'EVALUATION_BOOK';
export const GET_SALENUMER_MAX ='GET_SALENUMER_MAX';
export const GET_PROM_BOOK = 'GET_PROM_BOOK';
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
export function clearAutoComplete() {
    return dispatch => {
        dispatch({
          type: AUTO_COMPLETE,
          data: {}
        });
    }
}
export function getBookList(params){
  return dispatch => {
      HttpRequest.get('/api/book/searchBook')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: SEARCH_BOOK,
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
export function getBookMenu() {
    return dispatch => {
        HttpRequest.get('/api/book/bookMenu')
        .end(function(err,resp){
          dispatch({
            type: GET_BOOKMENU,
            data: resp.body
          });
      });
    };
}
export function searchByType(params) {
    return dispatch => {
        HttpRequest.get('/api/book/searchByType')
        .query(params)
        .end(function(err,resp){
          dispatch({
            type: SEARCH_BOOK_BYTYPE,
            data: resp.body
          });
      });
    };
}
export function evaluationBook(params) {
  return dispatch => {
      HttpRequest.get('/api/user/authorization/evaluation')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: EVALUATION_BOOK,
          data: resp.body
        });
    });
  };
}
export function getSalenumberMax() {
  return dispatch => {
      HttpRequest.get('/api/book/sortBySaleNum')
      .end(function(err,resp){
        dispatch({
          type: GET_SALENUMER_MAX,
          data: resp.body
        });
    });
  };
}
export function getPromBook() {
  return dispatch => {
      HttpRequest.get('/api/book/promBook')
      .end(function(err,resp){
        dispatch({
          type: GET_PROM_BOOK,
          data: resp.body
        });
    });
  };
}