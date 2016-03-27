var db = require('../db');
function Books () {
}
module.exports = Books;
Books.autoComplete = autoComplete(req, res) {
	var reg = new RegExp(req.body.searchKey);
	console.log(reg,'?????')
}
function queryBook(obj,dataBase,callback) {
  db[dataBase].find(obj).limit(10).exec(function(err, data){
	  callback(data);
  })
}
