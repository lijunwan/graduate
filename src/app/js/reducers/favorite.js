import {ADD_FAVORITE, GET_FAVORITE, DEL_FAVORITE} from '../actions/favorite';
import Immutable from 'immutable';
export default function (state = Immutable.fromJS({addFavoriteMess: {},favorite:{}}), action) {
  switch (action.type) {
  case ADD_FAVORITE:
    return state.set("addFavoriteMess", action.data);
  case GET_FAVORITE:
    return state.set("favorite",action.data);
  case DEL_FAVORITE:
    return state.set("favorite",action.data);
  default:
    return state;
  }
}
