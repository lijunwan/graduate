var db = require('../db');
function Books (user) {
	this.phone = user.phone;
	this.password = user.password;
}
module.exports = Books;
