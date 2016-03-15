var db = require('../db');
function Users (user) {
	this.account = user.account;
	this.password = user.password;
}
module.exports = Users;
Users.find = function find(callback) {
	db["user"].find(function(err,user){
		if(err) return console.error(err);
		console.log(user,"------");
		callback(err,user);
	})
}