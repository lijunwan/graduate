var settings = require ('./Settings');
//import mongodb from 'mongodb';
var  mongoose = require('mongoose');
var connection = mongoose.connection;
//var Db = mongodb.Db;
//var Connection = mongodb.Connection;
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost',"bookstore");
db.on('error',console.error.bind(console,'connection error'));
var dataModel = {};
db.once('open', function (callback) {
	var userSchema = new Schema({
		account:String,
		password:String
	});
	var logSchema = new Schema({
		id:String,
		account:String,
		lastTime:Date,
	})
	dataModel["users"] = db.model('users',userSchema);
	dataModel["logs"] = db.model('logs',logSchema);
})
module.exports = dataModel;
