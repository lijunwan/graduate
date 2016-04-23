import {CREATE_ORDER} from '../actions/order';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({orderInfo:[]}), action) {
  switch (action.type) {
  case CREATE_ORDER:
    return state.set("orderInfo", action.data);
  default:
    return state;
  }
}
