var settings = require ('./Settings');
//import mongodb from 'mongodb';
var  mongoose = require('mongoose');
var connection = mongoose.connection;
//var Db = mongodb.Db;
//var Connection = mongodb.Connection;
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost',"bookstroe");
db.on('error',console.error.bind(console,'connection error'));
var dataModel = {};
db.once('open', function (callback) {
	var userSchema = new Schema({
		account:String,
		password:String
	});
	dataModel["users"] = db.model('users',userSchema);
})
module.exports = dataModel;
