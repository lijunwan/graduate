var settings = require ('./Settings');
//import mongodb from 'mongodb';                                                    
var  mongoose = require('mongoose');
var connection = mongoose.connection;
//var Db = mongodb.Db;
//var Connection = mongodb.Connection;
var Schema = mongoose.Schema;
var db = mongoose.createConnection('localhost',settings.db);
db.on('error',console.error.bind(console,'connection error'));
var dataModel = {};
db.once('open', function (callback) {
	var userSchema = new Schema({
		accont:String,
		password:String
	});
	dataModel["user"] = mongoose.model('user',userSchema)
})
module.exports = dataModel;