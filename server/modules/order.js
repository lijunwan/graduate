var db = require('../db');
var GR = require('../helper');
var schedule = require('node-schedule');
var moment = require('moment');
var __remove = require('lodash/remove')
function Order(order) {

}
module.exports = Order;
Order.createOrder = function createOrder(req, res) {
	// var orderObj = {};
	// orderObj.userId = req.cookies.bookstore.id;
	//	orderObj.sumMon = 0;
	// orderObj.time = new Date();
	// orderObj.address = req.query.address;
	var userId = req.cookies.bookstore.id;
	var bookInfo = JSON.parse(req.query.bookInfo);
	var bookIdList = GR.getKeyValueList(bookInfo, 'bookId');
	var shopCartId = GR.getKeyValueList(bookInfo, '_id');
	db['bookInfo'].findItemsByList(req, res, bookIdList, function(bookInfoList){
		bookInfo.map(function(bookInfoItem){
			var obj = GR.findItem(bookInfoList, '_id', bookInfoItem.bookId);
			if(obj) {
				bookInfoItem.aprice = obj.aprice;
				bookInfoItem.cover = obj.cover;
				bookInfoItem.bookName = obj.bookName;
				bookInfoItem.sumMon = (obj.aprice * bookInfoItem.count).toFixed(2);
				bookInfoItem.time = new Date();
				bookInfoItem.address = req.query.address;
				bookInfoItem.userId = req.cookies.bookstore.id;
				bookInfoItem.orderStatus = "UNPAY";
				if(obj.stocks > bookInfoItem.count) {
					obj.stocks -= bookInfoItem.count;
					obj.save();
				}
			} else {
				res.statusCode = 404;
        		res.send({errorCode: 404501, message: '创建订单失败'});
			}
		});
		db['order'].createItem(req, res, bookInfo, function(data){
			db['users'].findById(userId, function(error, user){
				if(user){
					data.map(function(item){
						user.payOrder.push(item['_id'])
					})
					user.save();
				}
				db['shopCart'].where('_id').in(shopCartId).remove({}).exec(function(error,shopCart){
					res.send({data: data})
				})
				
			})
		})
	})
}
Order.getOrderList = function getOrderList(req, res) {
	var userId = req.cookies.bookstore.id;
	db['users'].findById(userId, function(error, user){
		if(user){
			db['order'].findItemsByList(req, res, user.payOrder, function(data){

				res.send({data: data});
			})
		}
	})
}
Order.getOrderInfo = function getOrderInfo(req, res) {
	var orderId = req.query.orderId;
	console.log(orderId, 'orderId--------------')
	db['order'].findItemById(req, res, orderId, function(data){
		res.send({data: data});
	})
}
Order.payOrder = function payOrder(req, res) {
	var userId = req.cookies.bookstore.id;
	var sumMon = req.query.sumMon;
	const orderInfo = JSON.parse(req.query.orderInfo);
	const orderIdList = GR.getKeyValueList(orderInfo,'_id');
	const bookList = GR.getKeyValueList(orderInfo,'bookId');
	console.log('---',bookList)
	db['order'].findById(orderIdList[0], function(error, firstOrder){
		if(firstOrder.orderStatus == 'UNSEND') {
			res.statusCode = "404"
			res.send({errorCode: '404501', message: '已支付'})
		}else {
			db['order'].where('_id').in(orderIdList).update({},{orderStatus:'UNSEND'},{multi: true},function(error,data){
				if(data) {
					db['bookInfo'].where('_id').in(bookList).exec(function(error, books){
						orderInfo.map(function(orderItem){
							var obj = GR.findItem(books, '_id', orderItem.bookId);

							if(obj) {
								obj.saleNumber += orderItem.count;
								obj.save();
							}
						})
						db['order'].where('_id').in(orderIdList).exec(function(error, order){
							res.send({data: order})
						})
					})
				}
			})
		}
	})
}
Order.delOrder = function(req, res) {
	var userId = req.cookies.bookstore.id;
	var orderId = req.query.orderId;
	db['users'].findById(userId, function(error, user){
		var newOrder = __remove(user.payOrder, function(item) {
			console.log('---', item, orderId);
			return item != orderId;
		});
		console.log('---',newOrder)
		user.payOrder = newOrder;
		user.save();
		db['order'].findItemsByList(req, res, newOrder,function(orderList){
			res.send({
				data: orderList,
			})
		})
	})
}
Order.confirmReceipt = function(req, res) {
	var userId = req.cookies.bookstore.id;
	var orderId = req.query.orderId;
	console.log('confirmReceipt')
	db['order'].findById(orderId, function(error, data){
		if(error) console.error(error)
		if(data) {
 			data.orderStatus = 'UNEVALUATION';
 			data.save();
			db['users'].findById(userId, function(error, user){
				db['order'].findItemsByList(req, res,user.payOrder, function(order){
					res.send({data: order});
				})
			})
		}
	})
}
//用于定时任务
Order.filterOrder = function() {
	var date = Date.parse(new Date());
	db['order'].find({orderStatus: 'UNPAY'},function(err, data){
		console.log(data)
		data.map(function(item){
			if(date - Date.parse(item.time) > 300000){
				item.orderStatus = 'CLOSED';
			}
			item.save();
			db['bookInfo'].findById(item.bookId, function(err, book){
				console.log(item.bookId,'book------')
				book.stocks += item.count;
				book.save();
			})
		})
		//data.save();
	})
	//console.log('new',new Date(Date.parse(date)+300000));
}
function getKeyValueList(list,key) {
	const result = [];
	list.map(function(item){
		result.push(item[key]);
	});
	return result;
}
