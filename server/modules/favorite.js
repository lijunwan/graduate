var db = require('../db');
var __pick = require('lodash/pick');
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
  db['favorite'].hasRecords({userId: obj.userId, bookId: obj.bookId}, function(result){
    if(!result) {
      db['bookInfo'].findBookById(obj.bookId, function(book){
          obj.collectPrice = book.aprice;
          console.log('book1243',book.favorite);
          book.favorite.push(obj.userId);
          book.save();
          db['favorite'].createFavorite(obj,function(favorite){
            var favoriteData = __pick(favorite,['userId','bookId','time','collectPrice']);
            db['users'].findUserById(obj.userId, function(data) {
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
  var boj = {}
  var userId = req.cookies.bookstore.id;
  if(userId) {
    db['favorite'].find({userId: userId}, function(err,favorite){
      if(err) return console.error(err);
      if (favorite) {
        obj = __pick(favorite,['bookId','userId','collectPrice','time']);
        db['bookInfo'].findBookById(obj.bookId, function(err, book){
          if(book) {
            var bookInfo = __pick(book,['aprice', 'bookName', 'cover','flag']);

            res.end({data:{favorite:obj, bookInfo: bookInfo}});
          } else {
            res.statusCode= 404;
            res.send({errorCode: 404001,message:'未找到相关书籍'});
          }
        });

      } else {
        res.statusCode= 404;
        res.send({errorCode: 404001,message:'未找到相关收藏'});
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
