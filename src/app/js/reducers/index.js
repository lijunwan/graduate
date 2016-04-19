import { combineReducers } from 'redux';
import clientReducer from './client';
import bookInfoReducer from './book';
import favoriteReducer from './favorite';
const rootReducer = combineReducers({
  client: clientReducer,
  bookInfo: bookInfoReducer,
  favorite: favoriteReducer,
});
export default rootReducer;
