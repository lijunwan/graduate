import {AUTO_COMPLETE} from '../actions/book';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({autoComplete:{}}), action) {
  switch (action.type) {
  case AUTO_COMPLETE:
    return state.set("autoComplete", action.data);
  default:
    return state;
  }
}
