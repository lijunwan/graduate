var db = require('../db');
var  __pick = require('lodash/pick');
var GR = require('../helper')
function Books (book) {
	this.bookName = book.bookName;
}
module.exports = Books;
Books.autoComplete = function autoComplete(req, res) {
	var reg = new RegExp(req.query.searchKey,'i');
	console.log(reg,'!!!!')
	queryBook(reg,'bookInfo', function(err, data){
		console.log(data,'----');
		var list = [];
		data.map((item)=>{
			var obj ={};
			obj.id = item['_id'];
			obj.bookName = item.bookName;
			obj.author = item.author;
			obj.price = item.price;

			list.push(obj)
		});
		res.send({data:list})
	});
}
Books.searchBook = function searchBook(req, res) {
	var reg = new RegExp(req.query.searchKey,'i');
	searchBookMongo(reg, 'bookInfo', function(err, data){
		var list = [];
		data.map((item)=>{
			var obj = __pick(item, ['bookName', 'aprice','author', 'pubHouse', 'pubDate', 'price', 'discount', 'cover', 'introduce', 'saleNumber', 'scores']);

			obj.id = item['_id'];
			console.log('===', item.evaluation)
			// obj.scores = calculatedAverage(item.evaluation,'scores');
			list.push(obj);
			console.log(obj);
		});
		res.send({data:list});
	})
}
Books.getOnSaleBooks = function getOnSaleBook (req, res) {
	getBooks('bookOnSale', function(err, data){
		if(data){
			res.send({data:data})
		}else {
			res.statusCode=404;
			res.send({errorCode:404601,message:"未知错误"})//数据库错误
		}
	})
}
Books.getNewBooks = function getOnSaleBook (req, res) {
	getBooks('bookNew', function(err, data){
		if(data){
			res.send({data:data})
		}else {
			res.statusCode=404;
			res.send({errorCode:404601,message:"未知错误"})//数据库错误
		}
	})
}
Books.getBookInfo = function getBookInfo (req, res) {
	getBookDetailInfor('bookInfo',req.query.bookId ,function(err, data){
		if(data){
			res.send({data:data})
		}else {
			res.statusCode=404;
			res.send({errorCode:404601,message:"Not found"})//数据库错误
		}
	})
}
Books.getBookMenu = function(req, res) {
	db['bookMenu'].find({},function(error, data){
		if(data){
			res.send({data: data})
		}
	})
}
Books.searchByType = function(req, res) {
	var type = req.query.type;
	var reg = new RegExp('^'+type,'i');
	db['bookInfo'].find({type: reg},function(err, data){
		if(data) {
			const typeList = req.query.type.split('');
			console.log('---',typeList)
			const typeName = [];
			db['bookMenuConfig'].findOne({type: typeList[0]}, function(err, menu){
				if(menu) {
					typeName.push(menu);
					if(typeList[1]) {
						db['bookMenuConfig'].findOne({type: typeList[0]+typeList[1]}, function(err, menuLevel) {
							typeName.push(menuLevel);
							if(typeList[2]) {
								db['bookMenuConfig'].findOne({type: typeList[0]+typeList[1]+typeList[2]}, function(err, menuLevel2) {
									typeName.push(menuLevel2);
									res.send({data: data, type: typeName})
								})
							} else {
								res.send({data: data, type: typeName})
							}
						})
					} else {
						res.send({data: data, type: typeName})
					}
				}
			})
		}
	})
}
Books.evaluationBook = function(req, res) {
	var userId = req.cookies.bookstore.id;
	var evaluation = __pick(req.query, ['scores', 'evaText'])
	var bookId = req.query.bookId;
	var orderId = req.query.orderId;
	evaluation.userId = userId;
	db['users'].findById(userId, function(error, user){
	  evaluation.headImg = user.headImg;
		evaluation.userName = user.userName;
		evaluation.date = new Date();
		db['bookInfo'].findById(bookId, function(error, data){
			data.evaluation.push(evaluation);
			data.scores = calculatedAverage(data.evaluation, 'scores');
			console.log(data.evaluation,'????')
			data.save();
			db['order'].findById(orderId, function(error, order){
				order.orderStatus = 'EVALUATIONED';
				order.save();
				res.send({data: order});
			});
		})
	})
}
Books.sortBySaleNum = function(req, res) {
	db['bookInfo'].find({}).sort({saleNumber: -1}).limit(10).exec(function(error,data){
		res.send({data:data});
	})
}
Books.promBook = function(req, res) {
	db['promBook'].find({}).limit(10).exec(function(error,data){
		var bookIdList = GR.getKeyValueList(data, 'bookId');
		db['bookInfo'].findByIdList(req, res, bookIdList, function(data){
			res.send({data: data})
		})
	})
}
function calculatedAverage(list, key) {
	var sum = 0;
	if(list.length <1) {
		return sum;
	}
	list.map(function(item){
		sum += parseInt(item[key]);
		console.log(item[key], '----')
	})
	console.log(sum, '----')
	return sum/list.length;
}

function getBookDetailInfor (dataBase,id,callback) {
	db[dataBase].findOne({_id:id}).exec(function(err, data){
  	  callback(err, data);
    })
}
function getBooks (dataBase, callback) {
	db[dataBase].find().limit(24).exec(function(err, data){
  	  callback(err, data);
    })
}
function queryBook(reg,dataBase,callback) {
  db[dataBase].find().or([{bookName:reg}, {author:reg}]).limit(10).exec(function(err, data){
	  callback(err, data);
  })
}
function searchBookMongo(reg, dataBase, callback) {
	console.log('//////////===',reg);
	db[dataBase].find().or([{bookName:reg}, {author:reg}]).exec(function(err, data){
  	  callback(err, data);
    })
}
