import { CLIENT_INFO, CHECK_LOGIN, CLIENT_INFO_UPDATE, CLIENT_PWD_UPDATE, PWD_STATUS } from '../actions/client';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({info: {}, baseInfoUpdated:0, pwdUpdated:{}}), action) {

  switch (action.type) {
  case CLIENT_INFO:
    // console.log("action data",action);
    // return Immutable.fromJS(action.data);
    return state.mergeDeep(Immutable.fromJS({info: action.data}));
    // return Object.assign({}, state, action.data);
  case CLIENT_INFO_UPDATE:
    return state.set("baseInfoUpdated", action.data);
  case CLIENT_PWD_UPDATE:
    return state.set("pwdUpdated", action.data);
  case PWD_STATUS:
    return state.set("pwdUpdated", action.data);
  case CHECK_LOGIN:
    // console.log("aaa");
    // console.log(action.data);
    //console.log("123",state.getIn(["client","email"]));
    return state.set("info", action.data);
    // return state.updateIn(["client","email"],()=>action.data.email)
  default:
    return state;
  }
}
