import {AUTO_COMPLETE, GET_BOOK_ON_SALE, GET_BOOK_NEW, GET_BOOK_INFO} from '../actions/book';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({autoComplete:{},bookOnSale:{}, bookNew:{}, bookInfo: {}}), action) {
  switch (action.type) {
  case AUTO_COMPLETE:
    return state.set("autoComplete", action.data);
  case GET_BOOK_ON_SALE:
    return state.set("bookOnSale", action.data);
  case GET_BOOK_NEW:
     return state.set("bookNew", action.data);
  case GET_BOOK_INFO:
        return state.set("bookInfo", action.data);
  default:
    return state;
  }
}
