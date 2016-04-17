var db = require('../db');
var  __pick = require('lodash/pick');
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
		console.log('================',data)
		var list = [];
		data.map((item)=>{
			var obj = __pick(item, ['bookName', 'author', 'pubHouse', 'pubDate', 'price', 'discount', 'cover', 'introduce']);
			obj.id = item['_id'];
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
	console.log('=============')
	getBookDetailInfor('bookInfo',req.query.bookId ,function(err, data){
		if(data){
			res.send({data:data})
		}else {
			res.statusCode=404;
			res.send({errorCode:404601,message:"Not found"})//数据库错误
		}
	})
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
