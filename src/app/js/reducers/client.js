import {CHECK_LOGIN,
        CHECK_PHONE,
        CREATE_USER,
        ADD_BOOK,
        GET_SHOPCARTS,
        UPDATE_USERINFO,
        GET_USERINFO,
        UPDATE_PASS,
        ADD_ADDRESS,
        GET_ADDRESS,
        DEL_ADDRESS} from '../actions/client';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({info: {},phoneInfo:{},registerInfo:{}, addBookMess:{},shopCart:{}, userInfo: {}, updatePass:{}, address:{},addressList:{}}), action) {
  switch (action.type) {
  case CHECK_LOGIN:
    return state.set("info", action.data);
  case CHECK_PHONE:
    return state.set("phoneInfo",action.data);
  case CREATE_USER:
    return state.set("registerInfo", action.data);
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
     return state.set("addressList",action.data);
 case GET_ADDRESS:
    return state.set("addressList",action.data);
case DEL_ADDRESS:
   return state.set("addressList",action.data);
  default:
    return state;
  }
}
