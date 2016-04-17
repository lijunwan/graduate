var db = require('../db');
var __pick = require('lodash/pick');
function ShopCart (cart) {
	this.userId = cart.userId;
    this.bookId = cart.bookId;
    this.price = cart.price;
}
module.exports = ShopCart;
ShopCart.addBook = function addBook (req, res) {
    var obj = __pick(req.query, ['bookId','count']);
	if(obj.bookId && obj.count) {
    	obj.userId = req.cookies.bookstore.id;
        db['shopCart'].findOne({bookId: obj.bookId}, function(err, book){
            if(err) return console.error(err);
            if(book) {
                book.count += parseInt(obj.count);
                book.save();
                res.send({message: 'ok'})
            } else {
                db['bookInfo'].findOne({_id: obj.bookId}, function(err, item){
                    if(err) return console.error(err);
                    if(item) {
                        obj.price = item.price;
                        obj.aprice = item.aprice;
                        obj.discount = item.discount;
                        obj.bookName = item.bookName;
                    }
                    db['shopCart'].create(obj,function(err,shopCart){
                        if(err) return console.error(err);
                        db['users'].findOne({_id: obj.userId},function(err,user){
                            if(err) return console.error(err);
                            console.log(user, '====')
                            user.shopCart.push(shopCart['_id']);
                            user.save();
                            res.send({message: 'ok'})
                        });
                    });
                })
            }
        })
    }else {
        res.statusCode = 401;
        res.send({errorCode: 401001, message: '错误参数'});
    }
}
ShopCart.getShopCartInfo = function getShopCartInfo(req, res) {
      var userId = req.cookies.bookstore.id;
        db.shopCart.find({'userId':userId}, function(err,data) {
            if(err) return console.error(err);
            res.send({data: data});
        })
}