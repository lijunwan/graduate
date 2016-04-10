var db = require('../db');
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
			list.push(obj)
		});
		res.send({data:list})
	});
}
Books.getOnSaleBooks = function getOnSaleBook (reg, res) {
	getBooks('bookOnSale', function(err, data){
		if(data){
			res.send({data:data})
		}else {
			res.statusCode=404;
			res.send({errorCode:404601,message:"未知错误"})//数据库错误
		}
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
