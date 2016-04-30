import {CHECK_LOGIN,
        CHECK_PHONE,
        CREATE_USER,
        ADD_BOOK,
        GET_SHOPCARTS,
        UPDATE_USERINFO,
        GET_USERINFO,
        UPDATE_PASS,
        ADD_ADDRESS} from '../actions/client';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({info: {},phoneInfo:{},registerInfo:{}, addBookMess:{},shopCart:{}, userInfo: {}, updatePass:{}, address:{}}), action) {
  switch (action.type) {
  case CHECK_LOGIN:
    return state.set("info", action.data);
  case CHECK_PHONE:
    return state.set("phoneInfo",action.data);
  case ADD_BOOK:
    return state.set("addBookMess",action.data);
  case GET_SHOPCARTS:
    return state.set("shopCart",action.data);
  case UPDATE_USERINFO:
    return state.set("userInfo",action.data);
  case GET_USERINFO:
    return state.set("userInfo",action.data);
  case UPDATE_PASS:
    return state.set("updatePass",action.data);
  case ADD_ADDRESS:
     return state.set("address",action.data);
  default:
    return state;
  }
}
