import 'babel-core/polyfill';
import React from "react";
import ReactDOM from 'react-dom'
import routes from './routes/Root';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();
import createBrowserHistory from 'history/lib/createBrowserHistory';
let history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById("app")
)