var express = require('express');
var app = express();
var router = express.Router();
var User = require('../modules/user.js');
var Books = require('../modules/book');
var ShopCart = require('../modules/shopCart');
var Favorite = require('../modules/favorite');
app.post('/api/user/login',User.checkLogin);
app.get('/api/log',User.isLogin);
app.get('/api/user/phone',User.checkPhone);
app.post('/api/user/register',User.createUser);
app.del('/api/user/logout',User.logout);
app.get('/api/book/autoComplete', Books.autoComplete);
app.get('/api/book/bookOnSale', Books.getOnSaleBooks);
app.get('/api/book/bookNew', Books.getNewBooks);
app.get('/api/book/bookInfo', Books.getBookInfo);
app.get('/api/book/searchBook', Books.searchBook);
app.use('/api/user/authorization/*', function(req, res, next){
    if(req.cookies.bookstore && req.cookies.bookstore.id) {
        next('route')
        console.log(next);
    }else {
        res.statusCode=401;
        res.send({errorCode:400100,message:"未授权"})
    }
});
app.get('/api/user/authorization/addShopCarts', ShopCart.addBook);
app.get('/api/user/authorization/getShopCarts', ShopCart.getShopCartInfo);
app.get('/api/user/authorization/updateShopCart', ShopCart.updateShopCart);
app.get('/api/user/authorization/addFavorite', Favorite.addFavorite);
app.get('/api/user/authorization/getFavorite', Favorite.getFavorite);
app.get('/api/user/authorization/delFavorite', Favorite.delFavorite);
module.exports = app;
