var db = require('../db');
var GR = require('../helper');
function Order(order) {

}
module.exports = Order;
Order.createOrder = function createOrder(req, res) {
	var orderObj = {};
	orderObj.userId = req.cookies.bookstore.id;
	orderObj.sumMon = 0;
	orderObj.time = new Date();
	orderObj.address = req.query.address;
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
				orderObj.sumMon += bookInfoItem.sumMon;
			} else {
				res.statusCode = 404;
        		res.send({errorCode: 404501, message: '创建订单失败'});
			}
		});
		orderObj.info = bookInfo;
		orderObj.status = 'UNPAI'
		db['order'].createItem(req, res, orderObj, function(data){
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
function getKeyValueList(list,key) {
	const result = [];
	list.map(function(item){
		result.push(item[key]);
	});
	return result;
}
