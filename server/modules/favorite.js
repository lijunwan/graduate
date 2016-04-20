var db = require('../db');
var __pick = require('lodash/pick');
var __assign = require('lodash/assign');
var __find = require('lodash/find');
function Favorite (favorite) {
  this.time = favorite.time;
	this.userId = favorite.userId;
  this.bookId = favorite.bookId;
  this.collectPrice = favorite.collectPrice;
}
module.exports = Favorite;
Favorite.addFavorite = function addFavorite (req, res) {
  var obj = {}
  obj.userId = req.cookies.bookstore.id;
  obj.bookId = req.query.bookId;
  obj.time = new Date();
  db['favorite'].hasRecords(req, res, {userId: obj.userId, bookId: obj.bookId}, function(result){
    if(!result) {
      db['bookInfo'].findBookById(req, res, obj.bookId, function(book){
          obj.collectPrice = book.aprice;
          book.favorite.push(obj.userId);
          book.save();
          db['favorite'].createFavorite(req, res, obj,function(favorite){
            var favoriteData = __pick(favorite,['userId','bookId','time','collectPrice']);
            db['users'].findUserById(req, res, obj.userId, function(data) {
              data.favorite.push(obj.bookId);
              data.save();
              res.send({data: favoriteData});
            })
          })
      })
    } else {
      res.send({errorCode: 404060,message:'操作失败'});
    }
  })
}
Favorite.getFavorite = function getFavorite(req, res) {
  var userId = req.cookies.bookstore.id;
  if(userId) {
    db['favorite'].findItems(req, res, {userId: userId}, function(favorite){
      const list = [];
      var bookIdList = [];
      if(favorite.length > 0) {
        favorite.map(function(data) {
          var favoriteData = {};
          favoriteData.favorite =  __pick(data,['bookId','userId','collectPrice','time']);
          list.push(favoriteData);
          bookIdList.push(data.bookId);
        });
        db['bookInfo'].where('_id').in(bookIdList).exec(function(error, bookList){
          list.map(function(data){
            var bookItem = __find(bookList, function(obj){
              console.log('bookObj========', obj['_id'] == data.bookId);
              return obj['_id'] == data.bookId;
            })
            console.log('bookItem', bookItem);
            if(bookItem) {
              data.bookInfo = __pick(bookItem, ['cover', 'bookName', 'aprice', 'flag']);
            }else {
              data.bookInfo = {};
            }
          });
          res.send({data: list});
        })
      }
    })
  } else {
    res.statusCode= 404;
    res.send({errorCode: 404002,message:'参数错误'});
  }
}
// Favorite.delFavorite = function delFavorite(req, res) {
//
// }
