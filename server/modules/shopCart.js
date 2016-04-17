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
    	db['bookInfo'].findOne({_id: obj.bookId}, function(err, item){
    		if(err) return console.error(err);
    		if(item) {
    			obj.price = item.price;
    			obj.aprice = item.aprice;
    			obj.discount = item.discount;
    			obj.bookName = item.bookName;
    		}
    		db['shopCart'].create(obj,function(err,item){
    			if(err) return console.error(err);
    			db['users'].findOne({_id: obj.userId},function(err,item){
    	      		if(err) return console.error(err);
    	      	    item.shopCart.push(item[_id]);
    	            item.save();
					res.send({message: 'ok'})
    	      	});
    		});
    	})
    }else {
        res.statusCode = 401;
        res.send({errorCode: 401001, message: '错误参数'});
    }
}
