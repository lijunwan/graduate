import { combineReducers } from 'redux';
import clientReducer from './client';
import bookInfoReducer from './book'
const rootReducer = combineReducers({
  client: clientReducer,
  bookInfo: bookInfoReducer,
  });
export default rootReducer;
