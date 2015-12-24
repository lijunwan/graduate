import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

const __DEV__ = false;

const logger = createLogger({
  predicate: (getState, action) => __DEV__
});
/*const finalCreateStore = applyMiddleware(
  thunk, logger
)(createStore);*/
const finalCreateStore = compose(
  applyMiddleware(thunk, logger)
)(createStore);


export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}

