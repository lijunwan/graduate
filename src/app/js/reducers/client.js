import {CHECK_LOGIN,CHECK_PHONE,CREATE_USER} from '../actions/client';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({info: {},phoneInfo:{},registerInfo:{}}), action) {
  switch (action.type) {
  case CHECK_LOGIN:
    return state.set("info", action.data);
  case CHECK_PHONE:
    return state.set("phoneInfo",action.data);
  case CREATE_USER:
    return state.set("registerInfo",action.data);
  default:
    return state;
  }
}
