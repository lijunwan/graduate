import {CREATE_ORDER, GET_ORDER, PAY_ORDER} from '../actions/order';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({orderInfo:{},orderList:[], payOrder:{}}), action) {
  switch (action.type) {
  case CREATE_ORDER:
    return state.set("orderInfo", action.data);
  case GET_ORDER:
  	return state.set("orderList", action.data);
  case PAY_ORDER:
     return state.set("payOrder", action.data);
  default:
    return state;
  }
}
