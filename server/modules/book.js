var db = require('../db');
function Books (book) {
	this.bookName = book.bookName;
}
module.exports = Books;
Books.autoComplete = function autoComplete(req, res) {
	var req = new RegExp(req.query.searchKey,'i');
	console.log(req,'!!!!')
	queryBook(req,'bookInfo', function(err, data){
		console.log(data,'----');
		var list = [];
		data.map((item)=>{
			var obj ={};
			obj.id = item['_id'];
			obj.bookName = item.bookName;
			obj.author = item.author;
			list.push(obj)
		});
		res.send({data:list})
	});
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
function queryBook(req,dataBase,callback) {
  db[dataBase].find().or([{bookName:req}, {author:req}]).limit(10).exec(function(err, data){
	  callback(err, data);
  })
}
