import {CREATE_ORDER,
        GET_ORDER,
        PAY_ORDER,
        GET_ORDER_INFO,
        CONFIRM_ORDER,
        DEL_ORDER} from '../actions/order';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({orderInfo:{},orderList:[], payOrder:{}, singleOrder:{}}), action) {
  switch (action.type) {
  case CREATE_ORDER:
    return state.set("orderInfo", action.data);
  case GET_ORDER:
  	return state.set("orderList", action.data);
  case PAY_ORDER:
     return state.set("payOrder", action.data);
  case GET_ORDER_INFO:
    return state.set("singleOrder", action.data);
  case CONFIRM_ORDER:
    return state.set("orderList", action.data);
  case DEL_ORDER:
    return state.set('orderList', action.data);
  default:
    return state;
  }
}
