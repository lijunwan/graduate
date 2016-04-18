import {CHECK_LOGIN,CHECK_PHONE,CREATE_USER,ADD_BOOK,GET_SHOPCARTS} from '../actions/client';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({info: {},phoneInfo:{},registerInfo:{}, addBookMess:{},shopCart:{}}), action) {
  switch (action.type) {
  case CHECK_LOGIN:
    return state.set("info", action.data);
  case CHECK_PHONE:
    return state.set("phoneInfo",action.data);
  case ADD_BOOK:
    return state.set("addBookMess",action.data);
  case GET_SHOPCARTS:
    return state.set("shopCart",action.data);
  default:
    return state;
  }
}
