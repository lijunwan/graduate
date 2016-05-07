import {AUTO_COMPLETE,
        GET_BOOK_ON_SALE,
        GET_BOOK_NEW,
        GET_BOOK_INFO,
        SEARCH_BOOK,
        GET_BOOKMENU,
        SEARCH_BOOK_BYTYPE,
        EVALUATION_BOOK,
        GET_SALENUMER_MAX,
        GET_PROM_BOOK
    } from '../actions/book';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({autoComplete:{},bookOnSale:{}, bookNew:{}, bookInfo: {}, bookList:{}, bookMenu:[],bookListType:{},evalMess: {}, saleNumberBook:{},promoBook:{}}), action) {
  switch (action.type) {
  case AUTO_COMPLETE:
    return state.set("autoComplete", action.data);
  case GET_BOOK_ON_SALE:
    return state.set("bookOnSale", action.data);
  case GET_BOOK_NEW:
     return state.set("bookNew", action.data);
  case GET_BOOK_INFO:
    return state.set("bookInfo", action.data);
  case SEARCH_BOOK:
     return state.set("bookList", action.data);
 case GET_BOOKMENU:
    return state.set("bookMenu", action.data);
 case SEARCH_BOOK_BYTYPE:
    return state.set("bookListType", action.data);
  case EVALUATION_BOOK:
     return state.set("evalMess", action.data);
  case GET_SALENUMER_MAX:
     return state.set("saleNumberBook", action.data);
  case GET_PROM_BOOK:
    return state.set('promoBook',action.data)
  default:
    return state;
  }
}
