import {AUTO_COMPLETE, GET_BOOK_ON_SALE} from '../actions/book';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({autoComplete:{},bookOnSale:{} }), action) {
  switch (action.type) {
  case AUTO_COMPLETE:
    return state.set("autoComplete", action.data);
  case GET_BOOK_ON_SALE:
    return state.set("bookOnSale", action.data);
  default:
    return state;
  }
}
