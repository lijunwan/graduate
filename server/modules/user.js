var db = require('../db');
function Users (user) {
	this.account = user.account;
	this.password = user.password;
}
module.exports = Users;
Users.findOne = function findOne(obj,callback) {
	db["users"].findOne(obj,function(err,user){
		if(err) return console.error(err);
		console.log(user,"------");
		callback(err,user);
	})
}
