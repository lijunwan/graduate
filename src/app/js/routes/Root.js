import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from '../components/App';
import Index from '../components/index/Index';
import Login from '../components/login/Login'
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var IndexRoute  = Router.IndexRoute;
var routes = (
    <Route name="main"  path="/" component={App}>
     <Route name="login" path='login' component={Login} />
      <Route name="index" path='index' component={Index}/>
      <IndexRoute component={Login} />
      {/*<NotFoundRoute handler={RouteNotFound} />*/}
    </Route>
);

module.exports = routes;