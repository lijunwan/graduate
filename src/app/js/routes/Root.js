import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from '../components/App';
import Index from '../components/index/Index';
import Login from '../components/login/Login';
import Register from '../components/common/Register';
import Book from '../components/book/Book';
import SearchResult from '../components/SearchResult/SearchResult';
import ShopCart from '../components/ShopCart/ShopCart';
import Favorite from '../components/favorite/Favorite';
import Payment from '../components/pay/Payment.js';
import Order from '../components/order/Order';
import Pay from '../components/pay/Pay';
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var IndexRoute  = Router.IndexRoute;
var routes = (
    <Route name="main"  path="/" component={App}>
      <Route name="index" path='/index' component={Index}/>
      <Route name="login" path='/login' component={Login} />
      <Route name="register" path='/register' component={Register} />
      <Route name="book" path='/book/:bookId' component={Book} />
      <Route name="searchResult" path='/SearchResult' component={SearchResult} />
      <Route name="shopCart" path='/shopCart' component={ShopCart} />
      <Route name="favorite" path='/favorite' component={Favorite} />
      <Route name="payment" path='/payment/' component={Payment} />
      <Route name="order" path='/order' component={Order} />
      <Route name="pay" path='/pay' component={Pay} />
      <IndexRoute component={Index} />
      <Redirect from="/" to="index" />
      {/*<NotFoundRoute handler={RouteNotFound} />*/}
    </Route>
);

module.exports = routes;
