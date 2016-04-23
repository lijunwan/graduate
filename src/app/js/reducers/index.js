import { combineReducers } from 'redux';
import clientReducer from './client';
import bookInfoReducer from './book';
import favoriteReducer from './favorite';
import orderReducer from './order';
const rootReducer = combineReducers({
  client: clientReducer,
  bookInfo: bookInfoReducer,
  favorite: favoriteReducer,
  order: orderReducer,
});
export default rootReducer;
