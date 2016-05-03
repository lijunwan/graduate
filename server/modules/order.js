var db = require('../db');
var GR = require('../helper');
function Order(order) {

}
module.exports = Order;
Order.createOrder = function createOrder(req, res) {
	// var orderObj = {};
	// orderObj.userId = req.cookies.bookstore.id;
	//	orderObj.sumMon = 0;
	// orderObj.time = new Date();
	// orderObj.address = req.query.address;
	var bookInfo = JSON.parse(req.query.bookInfo);
	var bookIdList = getKeyValueList(bookInfo, 'bookId');
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
			} else {
				res.statusCode = 404;
        		res.send({errorCode: 404501, message: '创建订单失败'});
			}
		});
		db['order'].createItem(req, res, bookInfo, function(data){
			res.send({data: data})
		})
	})
}
Order.getOrderList = function getOrderList(req, res) {
	var userId = req.cookies.bookstore.id;
	db['order'].findItems(req, res, {userId: userId}, function(data){
		res.send({data: data});
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
Order.confirmReceipt = function(req, res) {
	var userId = req.cookies.bookstore.id;
	var orderId = req.query.orderId;
	console.log('confirmReceipt')
	db['order'].findById(orderId, function(error, data){
		if(error) console.error(error)
		if(data) {
 			data.orderStatus = 'UNEVALUATION';
 			data.save();
 			db['order'].findItems(req, res, {userId: userId}, function(data){
				res.send({data: data});
			})
		}
	})
}
function getKeyValueList(list,key) {
	const result = [];
	list.map(function(item){
		result.push(item[key]);
	});
	return result;
}
