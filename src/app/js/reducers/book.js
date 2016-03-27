import {SEARCH_BOOKS} from '../actions/book';
import Immutable from 'immutable';

export default function (state = Immutable.fromJS({searchReasult:[],bookList:{}}), action) {
  switch (action.type) {
  case SEARCH_BOOKS:
    return state.set("searchReasult", action.data);
  default:
    return state;
  }
}
