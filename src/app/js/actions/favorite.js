export const ADD_FAVORITE = 'ADD_FAVORITE';
export const GET_FAVORITE = 'GET_FAVORITE';
export const DEL_FAVORITE = 'DEL_FAVORITE';
import HttpRequest from 'superagent';
export function addFavorite(params){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/addFavorite')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: ADD_FAVORITE,
          data: resp.body
        });
    });
  };
}
export function getFavorite(){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/getFavorite')
      .end(function(err,resp){
        dispatch({
          type: GET_FAVORITE,
          data: resp.body
        });
    });
  };
}
export function delFavorite(params){
  return dispatch => {
      HttpRequest.get('/api/user/authorization/delFavorite')
      .query(params)
      .end(function(err,resp){
        dispatch({
          type: DEL_FAVORITE,
          data: resp.body
        });
    });
  };
}
