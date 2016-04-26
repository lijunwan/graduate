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
Order.payOrder = function payOrder(req, res) {
	var userId = req.cookies.bookstore.id;
	var orderId = req.query.orderId;
	var sumMon = req.query.sumMon;
	const orderIdList = JSON.parse(req.query.orderId);
	const newOrderList = [];
	orderIdList.map(function(orderId){
		db['order'].findOneAndUpdate({_id:orderId},{orderStatus: 'UNSEND'},{new: true},function(error, data){
			if(error) return console.error(error);
			console.log(data, '-----s')
			if(data) {
				newOrderList.push(data);
			}
			res.send({data: newOrderList});
			// if(data) {
			// 	data.info.map(function(bookInfo){
			// 		var obj = {}
			// 		obj.userId = userId;
			// 		obj.orderId = orderId;
			// 		obj.bookId = bookInfo.bookId;
			// 		obj.count = bookInfo.count;
			// 		obj.sumMon = bookInfo.sumMon;
			// 		obj.salePrice = bookInfo.aprice;
			// 		obj.time = data.time;
			// 		db['saleRecords'].createItem(obj, function(data) {
			// 			res.send({data:'支付成功'});
			// 		})
			// 	})
			// }
		})
	})
}
function getKeyValueList(list,key) {
	const result = [];
	list.map(function(item){
		result.push(item[key]);
	});
	return result;
}
