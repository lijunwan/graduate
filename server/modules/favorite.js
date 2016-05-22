var db = require('../db');
var __pick = require('lodash/pick');
var __assign = require('lodash/assign');
var __find = require('lodash/find');
var __remove = require('lodash/remove')
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
          obj.cover = book.cover;
          obj.bookName = book.bookName;
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
  console.log('????123=====');
  if(userId) {
    db['favorite'].findItems(req, res, {userId: userId}, function(favorite){
      const list = [];
      var bookIdList = [];
        favorite.map(function(data) {
          var favoriteData = {};
          favoriteData.favorite = data;
          list.push(favoriteData);
          bookIdList.push(data.bookId);
        });
        db['bookInfo'].where('_id').in(bookIdList).exec(function(error, bookList){
          list.map(function(data){
            var bookItem = GR_findItem(bookList,'_id',data.favorite.bookId);
            if(bookItem) {
              data.bookInfo = __pick(bookItem, ['cover', 'bookName', 'aprice', 'flag']);
            }else {
              data.bookInfo = {};
            }
          });
          res.send({data: list});
        })
    })
  } else {
    res.statusCode= 404;
    res.send({errorCode: 404002,message:'参数错误'});
  }
}
function GR_findItem(list, key, value) {
  for(var i=0;i<list.length;i++) {
    if(list[i][key] == value) {
      return list[i];
    }
  }
  return undefined;
}
Favorite.delFavorite = function delFavorite(req, res) {
    var obj = {}
    obj.userId = req.cookies.bookstore.id;
    obj.bookId = req.query.bookId;
    if(obj.bookId) {
      db['favorite'].findOneAndRemove(obj, function(error, favorite){
        if(error) return console.error(error);
      if(favorite) {
        db['users'].findUserById(req,res,obj.userId, function(user){
           var newFav = __remove(user.favorite, function(bookId){
             return obj.bookId == bookId;
           });
        user.favorite = newFav;
        user.save();
        db['bookInfo'].findBookById(req,res,obj.bookId, function(book) {
          var newFav = __remove(book.favorite, function(userId){
          return obj.userId == userId;
          })
          book.favorite = newFav;
          book.save();
          Favorite.getFavorite(req, res)
        })
    });
    } else {
       res.statusCode= 404;
       res.send({errorCode: 4046001,message:'操作失败'});
    }
  })
  }else{
    res.statusCode= 404;
    res.send({errorCode: 404002,message:'参数错误'});
  }
}
