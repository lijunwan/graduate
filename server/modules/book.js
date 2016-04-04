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
function queryBook(reg,dataBase,callback) {
  db[dataBase].find().or([{bookName:reg}, {author:reg}]).limit(10).exec(function(err, data){
	  callback(err, data);
  })
}
