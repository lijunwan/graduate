var db = require('../db');
var __pick = require('lodash/pick');;
var __assign = require('lodash/assign');
var GR = require('../help.js');
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
        db['shopCart'].findOne({bookId: obj.bookId, userId: obj.userId}, function(err, book){
            if(err) return console.error(err);
            if(book) {
                book.count += parseInt(obj.count);
                book.save();
                res.send({bookId: obj.bookId})
            } else {
				db['bookInfo'].findById(obj.bookId, function(err, book){
					var bookInfo = __pick(book, ['bookName','aprice','cover'])
					var shopCartData = __assign({},bookInfo,obj);
					console.log('bookInfo--',bookInfo)
					db['shopCart'].create(shopCartData,function(err,shopCart){
	                    if(err) return console.error(err);
	                    db['users'].findOne({_id: obj.userId},function(err,user){
	                        if(err) return console.error(err);
	                        user.shopCart.push(shopCart['_id']);
	                        user.save();
	                        res.send({bookId: obj.bookId});
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
	const userShopCart = [];
	var userId = req.cookies.bookstore.id;
	db['users'].findUserById(req,res,userId,function(user){
		  var shopCartList = user.shopCart;
			db['shopCart'].findByIdList(req, res, shopCartList, function(shopCarts){
				var bookIdList = []
				shopCarts.map(function(shopCartItem){
					var shopCart = {};
					shopCart.shopCartInfo = shopCartItem;
					bookIdList.push(shopCartItem.bookId);
					userShopCart.push(shopCart);
				});
				db['bookInfo'].findByIdList(req, res, bookIdList, function(books){
					userShopCart.map(function(userShopCartItem){
						console.log('======', books);
						var bookInfo = GR.findItem(books,'_id',userShopCartItem.shopCartInfo.bookId);
						if(bookInfo) {
							userShopCartItem.bookInfo = bookInfo;
						} else {
							userShopCartItem.bookInfo = {};
						}
					});
					res.send({data: userShopCart});
				})
			})
	});
      // var userId = req.cookies.bookstore.id;
      //   db.shopCart.find({'userId':userId}, function(err,data) {
      //       if(err) return console.error(err);
      //       res.send({data: data});
      //   })
}
ShopCart.updateShopCart = function updateShopCart(req, res) {
	var obj = __pick(req.query, ['bookId','count']);
	if(obj.bookId && obj.count) {
		obj.userId = req.cookies.bookstore.id;
		db['shopCart'].findOne({bookId: obj.bookId, userId: obj.userId}, function(err, shopCart){
				if(err) return console.error(err);
				console.log('???',shopCart);
				if(shopCart) {
						shopCart.count = parseInt(obj.count);
						shopCart.save();
				}
				ShopCart.getShopCartInfo(req, res)
		});
	}
}
ShopCart.delShopCart = function(req, res) {
	var cartId = req.query.cartId;
	var userId = req.cookies.bookstore.id;
	db['shopCart'].findByIdAndRemove(cartId, function(error, shopCart){
		console.log(error);
		ShopCart.getShopCartInfo(req, res)
	})
}
