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
		phone:String,//电话
		password:String,//密码
		userName:String,//用户名
		baseInfoId:String,//基础信息 保存id
		shopCart:[],//购物车 数组保存id
		payOrder:[],//账单
		favorite:[]//收藏夹

	});
	//暂时不用
	var logSchema = new Schema({
		id:String,
		phone:String,
		userName:String,
		lastTime:Date,
	});
	var baseInfoSchema = new Schema({
		sex:Number,//性别 1 男 2 女 0 其他
		birthday:String,//生日
		headImg:String,//头像 保存图片的地址
		identity:String,//身份 在校学生 教师 上班族 自由职业 填写的其他省份
		address:String,//居住地址
		addressStatus:String,//居住状态 独居 和伴侣 和室友 和父母 和孩子 和宠物
		interests:String,//兴趣爱好
		lovePerson:String,//喜欢或欣赏的人
		introduce:String,//自我介绍
		ShippingAddress:[],//收货地址
	})
	dataModel["users"] = db.model('users',userSchema,'users');
	dataModel["baseInfo"] = db.model('baseInfo',baseInfoSchema,'baseInfo');
	dataModel["logs"] = db.model('logs',logSchema);
})
module.exports = dataModel;
