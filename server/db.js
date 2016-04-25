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
	var shopCartSchema = new Schema({
		bookId: String,//书的id
		count: Number,//数量
		userId: String, //用户ID
	//	aprice: Number,//售价
	//	sumMon: Number, //金额
	//	bookName: String,
	//	cover: String,
	})
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
	});
	var bookInfoSchema = new Schema({
		bookName:String,//书名
		author:String,//作者
		pubHouse:String,//出版社
		pubDate:String,//出版时间
		comment:[],//评论 存放评论的id
		price: Number,//定价
		discount: Number,//折扣
		aprice: Number,//售价
		cover:String,//封面 保存 照片位置
		picture:[],//书籍的图片
		editions:String,//版次
		pages:Number,
		words:Number,
		type:String,//分类
		authorIntro:[],//作者简介
		stocks:Number,//库存
		saleNumber:Number,//销售量，
		introduce:[],//简介，
		scores:String,//评分
		flag: String,//书籍的状态
		favorite: [],
	});
	//折扣书籍
	var bookOnSaleSchema = new Schema ({
		bookName:String,//书名
		author:String,//作者
		price: Number,//定价
		discount: Number,//折扣
		aprice: Number,
		cover:String,//封面 保存 照片位置
		detail: String,
	});
	//新书上架
	var bookNewSchema = new Schema ({
		bookName:String,//书名
		author:String,//作者
		price: Number,//定价
		discount: Number,//折扣
		aprice: Number,
		cover:String,//封面 保存 照片位置
		detail: String,
	});
	var bookClassSchema = new Schema({
		flag:String,//标志
		name:String,//分类的名字``
		children:[],
	});
	var favoriteSchema = new Schema({
		time: Date,
		bookId: String,
		userId: String,
		collectPrice: Number,//收藏夹
		//aprice 此时的价格 bookInfo 数据库
		//bookName bookInfo 数据库
		//bookCover bookInfo 数据库
		// flag 标志 bookInfo 降价 促销 缺货 正常
	});
	var orderSchema = new Schema({
		time: Date,//订单成交时间
		info: [Schema.Types.Mixed],//商品id aprice  数量
		sumMon: Number, //实际金额
		userId: String, //用户id
	    address: String,//收货地址
	    orderStatus: String,//unpaied paided/unsend send/unrecive recive
	});
	var saleRecordsSchema = new Schema({
		bookId: String,
		userId: String,
		count: Number,
		orderId: String,
		salePrice: Number,
		sumMon: Number,
	})
	userSchema.statics.findUserById = findItemById({errorCode:404405,message:"未找到相关的用户"});
	bookInfoSchema.statics.findBookById = findItemById({errorCode:404406,message:"未找到相关的书籍"});
	bookInfoSchema.statics.findByIdList = findByIdList({errorCode:404602,message:"未找到相关的书籍信息"})
	shopCartSchema.statics.findByIdList = findByIdList({errorCode:404601,message:"未找到该用户购物车的信息"})
	bookInfoSchema.statics.findItemsByList = findItemsByList({errorCode:404406,message:"未找到相关的书籍"})
	favoriteSchema.statics.findFavoriteById = findItemById({errorCode:404407,message:"未找到相关的收藏夹"});
	favoriteSchema.statics.createFavorite = createItem({errorCode:405401,message:"操作收藏夹失败"});
	favoriteSchema.statics.hasRecords = dbHasRecords();
	favoriteSchema.statics.findItems = findItems({errorCode:404600,message:'未找到相关收藏'});
	orderSchema.statics.createItem = createItem({errorCode:404700,message:'创建订单失败'})
	orderSchema.statics.findItems = findItems({errorCode:404700,message:'查找订单失败'})
	orderSchema.statics.findItemById = findItemById({errorCode:404701,message:'查找订单失败'})

	saleRecordsSchema.statics.createItem = createItem({errorCode:404702,message:'支付失败'})
	// function useUpdate (errorObj) {
	// 	this.findOne(userId,)
	// }
	function createItem(errorObj) {
		return function(req, res, obj,callback) {
			this.create(obj, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					res.statusCode="405";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message});
				}
			});
		}
	}
	function findItems(errorObj) {
		return function(req, res, obj, callback) {
			this.find(obj, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			});
		}
	}
	function findItemById(errorObj) {
		return function(req, res, id, callback) {
			this.findOne({'_id': id}, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					console.log(res,'????')
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			});
		}
	}
	function dbHasRecords() {//判断数据库里是否存在这条记录
		return function(req, res, obj, callback) {
			this.findOne(obj, function(error, data){
				if(error) return console.error(error);
				if(data) {
					callback(true);
				} else {
					callback(false);
				}
			});
		}
	}
	function findItemsByList() {
		return function(req, res, list, callback) {
			this.where('_id').in(list).exec(function(error,data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			});
		}
	}
	dataModel["users"] = db.model('users',userSchema,'users');
	dataModel["baseInfo"] = db.model('baseInfo',baseInfoSchema,'baseInfo');
	dataModel["logs"] = db.model('logs',logSchema);
	dataModel["bookInfo"] = db.model('bookInfo',bookInfoSchema,'bookInfo');
	dataModel['bookClass'] = db.model('bookClass', bookClassSchema, 'bookClass');
	dataModel['bookOnSale'] = db.model('bookOnSale', bookOnSaleSchema, 'bookOnSale');
	dataModel['bookNew'] = db.model('bookNew', bookNewSchema, 'bookNew');
	dataModel['shopCart'] = db.model('shopCart', shopCartSchema, 'shopCart');
	dataModel['favorite'] = db.model('favorite', favoriteSchema, 'favorite');
	dataModel['order'] = db.model('order', orderSchema, 'order');
	dataModel['saleRecords'] = db.model('saleRecords', saleRecordsSchema, 'saleRecords');
	var obj = {
		bookName:"javascript权威指南",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12",
		comment:[],
		price: 69.00,
		discount: 8.92,
		aprice: 61.55,
		cover:"/book/cover.jpg",
		picture:['/book/cover.jpg','/book/testImage2.jpg', '/book/testImage3.jpg', '/book/testImage4.jpg', '/book/testImage5.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"图书-计算机/网络-程序设计-其他",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:1000,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
	}
	var objOnSale = {
		bookName:"javascript权威指南",
		author:"朴灵",
		price: 61.00,
		discount:"8.92",
		cover:"book/cover.jpg",
		detail: '5709b6499180abb00defee0a'
	}
	dataModel['bookInfo'].create(obj,function(err,data){
		if(err) return console.error(err);
	})
	// dataModel['bookOnSale'].create(objOnSale,function(err,data){
	// 	if(err) return console.error(err);
	// 	console.log(data);
	// })
	// dataModel['bookNew'].create(objOnSale,function(err,data){
	// 	if(err) return console.error(err);
	// 	console.log(data);
	// })
// 	var obj = {
// 	flag:'J',
// 	name:'教育',
// 	children:[
// 		{
// 			flag:'J',
// 			name:'教材',
// 			children:[
// 				{
// 					flag:'JG',
// 			   		name:'高职高专教材'
// 				},
// 				{
// 		 			flag: 'JZ',
// 					name: '中职教材'
// 				}
// 			]
// 		},
// 		{
// 			flag:'W',
// 			name:'外语',
// 			children:[
// 				{
// 					flag:'WK',
// 					name:'口语'
// 				}
// 			]
// 		}
// 	]
// }
// 	dataModel['bookClass'].create(obj,function(err,data){
// 		if(err) return console.error(err);
// 		console.log(data);
// 	})
})
module.exports = dataModel;
