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
		shopCart:[],//购物车 数组保存id
		payOrder:[],//账单
		favorite:[],//收藏夹
		sex:String,//性别 1 男 2 女 0 其他
		birthday:String,//生日
		headImg:String,//头像 保存图片的地址
		name: String,//真实姓名
		ShippingAddress:[],//收货地址s
	});
	var shopCartSchema = new Schema({
		bookId: String,//书的id
		count: Number,//数量
		userId: String, //用户ID
		aprice: Number,//售价
		//sumMon: Number, //金额
		bookName: String,
		cover: String,
	})
	// //暂时不用
	// var logSchema = new Schema({
	// 	id:String,
	// 	phone:String,
	// 	userName:String,
	// 	lastTime:Date,
	// });
	// var baseInfoSchema = new Schema({
	// 	sex:Number,//性别 1 男 2 女 0 其他
	// 	birthday:String,//生日
	// 	headImg:String,//头像 保存图片的地址
	// 	name: String,//真实姓名
	// 	ShippingAddress:[],//收货地址
	// });
	var bookInfoSchema = new Schema({
		bookName:String,//书名
		author:String,//作者
		pubHouse:String,//出版社
		pubDate:String,//出版时间
		comment:[],//评论 存放评论的id
		price: String,//定价
		discount: String,//折扣
		aprice: String,//售价
		cover:String,//封面 保存 照片位置
		picture:[],//书籍的图片
		editions:String,//版次
		pages:Number,
		words:Number,
		type:String,//分类
		authorIntro:[],//作者简介
		stocks:Number,//库存
		saleNumber:Number,//销售量，
		prestocks: Number,//进货量,
		introduce:[],//简介，
		scores:Number,//评分
		flag: String,//书籍的状态
		favorite: [],
		evaluation:[],//评介　
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
		aprice:Number, //此时的价格 bookInfo 数据库
		bookName: String,// bookInfo 数据库
		cover:String //bookInfo 数据库
		// flag 标志 bookInfo 降价 促销 缺货 正常
	});
	var orderSchema = new Schema({
		time: Date,//订单成交时间
	  aprice: Number,
		cover: String,
		bookName: String,
		sumMon: Number, //实际金额
		userId: String, //用户id
	  address: String,//收货地址
	  orderStatus: String,//unpaied paided/unsend send/unrecive recive
		bookId: String,
		count: Number,
	});
	var saleRecordsSchema = new Schema({
		bookId: String,
		userId: String,
		count: Number,
		orderId: String,
		salePrice: Number,
		sumMon: Number,
	});
	var promBookSchema = new Schema({
		bookId: String,
	})
	var bookMenuSchema = new Schema({
		label: String,
		value: String,
		children: [],
	});
	var bookMenuConfigSchema = new Schema({
		label: String,
		value: String,
	})
	userSchema.statics.findUserById = findItemById({errorCode:404405,message:"未找到相关的用户"});
	bookInfoSchema.statics.findBookById = findItemById({errorCode:404406,message:"未找到相关的书籍"});
	bookInfoSchema.statics.findByIdList = findItemsByList({errorCode:404602,message:"未找到相关的书籍信息"})
	shopCartSchema.statics.findByIdList = findItemsByList({errorCode:404601,message:"未找到该用户购物车的信息"})
	bookInfoSchema.statics.findItemsByList = findItemsByList({errorCode:404406,message:"未找到相关的书籍"})
	favoriteSchema.statics.findFavoriteById = findItemById({errorCode:404407,message:"未找到相关的收藏夹"});
	favoriteSchema.statics.createFavorite = createItem({errorCode:405401,message:"操作收藏夹失败"});
	favoriteSchema.statics.hasRecords = dbHasRecords();
	favoriteSchema.statics.findItems = findItems({errorCode:404600,message:'未找到相关收藏'});
	orderSchema.statics.createItem = createItem({errorCode:404700,message:'创建订单失败'})
	orderSchema.statics.findItems = findItems({errorCode:404700,message:'查找订单失败'})
	orderSchema.statics.findItemById = findItemById({errorCode:404701,message:'查找订单失败'})
	orderSchema.statics.findItemsByList = findItemsByList({errorCode: 404101, message:'订单查找失败'})
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
					// console.log(res,'????')
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
			this.where('_id').in(list).sort({_id: -1}).exec(function(error,data){
				if(error) return console.error(error);
				if(data) {
					callback(data);
				} else {
					// console.log(res,'????')
					res.statusCode="404";
					res.send({errorCode:errorObj.errorCode,message: errorObj.message})
				}
			})
		}
	}
	dataModel["users"] = db.model('users',userSchema,'users');
	//dataModel["baseInfo"] = db.model('baseInfo',baseInfoSchema,'baseInfo');
	// dataModel["logs"] = db.model('logs',logSchema);
	dataModel["bookInfo"] = db.model('bookInfo',bookInfoSchema,'bookInfo');
	dataModel['bookClass'] = db.model('bookClass', bookClassSchema, 'bookClass');
	dataModel['bookOnSale'] = db.model('bookOnSale', bookOnSaleSchema, 'bookOnSale');
	dataModel['bookNew'] = db.model('bookNew', bookNewSchema, 'bookNew');
	dataModel['shopCart'] = db.model('shopCart', shopCartSchema, 'shopCart');
	dataModel['favorite'] = db.model('favorite', favoriteSchema, 'favorite');
	dataModel['order'] = db.model('order', orderSchema, 'order');
	dataModel['saleRecords'] = db.model('saleRecords', saleRecordsSchema, 'saleRecords');
	dataModel['bookMenu'] = db.model('bookMen', bookMenuSchema, 'bookMen');
	dataModel['bookMenuConfig'] = db.model('bookMenuConfig', bookMenuConfigSchema, 'bookMenuConfig');
	dataModel['promBook'] = db.model('promBook', promBookSchema, 'promBook');
	var obj = [{
		bookName:"JavaScript高级程序设计(第3版)",
		author:"[美]Nicholas C. Zakas",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-03",
		comment:[],
		price: '99.00',
		discount: '6.71',
		aprice: '66.40',
		cover:"/book/cover.jpg",
		picture:['/book/testImage2.jpg', '/book/testImage3.jpg', '/book/testImage4.jpg', '/book/testImage5.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["Nicholas C. Zakas（尼古拉斯?泽卡斯）世界顶级Web技术专家，现为雅虎公司界面呈现架构师，负责MyYahoo!和雅虎首页等大访问量站点的设计。尼古拉斯拥有丰富的Web开发和界面设计经验，曾经参与许多世界级大公司的Web解决方案开发。他还是HighPerformance JavaScript一书的作者，并与他人合作撰写了Professional Ajax和Even FasterWebSites。尼古拉斯拥有梅里马克学院计算机科学学士学位和埃迪柯特学院的MBA学位。他的个人网站是www.nczonline.net，他的Twitter别名是@slicknet。"],
		stocks:1000,
		saleNumber:0,
		introduce:["《JavaScript高级程序设计(第3版)》是JavaScript超级畅销书的最新版。ECMAScript5和HTML5在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript增添了很多适应未来发展的新特性。《JavaScript高级程序设计》这一版除增加5章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax与Comet服务器端通信，HTML5表单、媒体、Canvas(包括WebGL)及WebWorkers、地理定位、跨文档传递消息、客户端存储(包括IndexedDB)等新API，还介绍了离线应用和与维护、性能、部署相关的最佳开发实践。《JavaScript高级程序设计(第3版)》附录展望了未来的API和ECMAScriptHarmony规范。　　《JavaScript高级程序设计(第3版)》适合有一定编程经验的Web应用开发人员阅读，也可作为高校及社会实用技术培训相关专业课程的教材。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript DOM编程艺术(第2版)",
		author:"（英）基思",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '49.00',
		discount: '8.19',
		aprice: '40.10',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["JavaScript是Web开发中最重要的一门语言，它强大而优美。无论是桌面开发，还是移动应用。JavaScript都是必须掌握的技术。W3C的DOM标准是开发Web应用的基石。已经得到所有现代浏览器的支持，这使得跨平台Web开发成了一件轻松惬意的事。","本书是超级畅销书的升级版，由倡导Web标准的领军人物执笔，揭示了前端开发的真谛，是学习JavaScript和DOM开发的必读之作。","本书在简洁明快地讲述JavaScript和DOM的基本知识之后，通过几个实例演示了专业水准的网页开发技术，透彻阐述了平稳退化等一批至关重要的JavaScript编程原则和最佳实践，并全面探讨了HTML5以及jQuery等JavaScript库。读者将看到JavaScript、HTML5和CSS如何协作来创建易用的、与标准兼容的Web设计，掌握使用JavaScript和DOM通过客户端动态效果和用户控制的动画来加强Web页面的必备技术；同时，还将对如何利用库提高开发效率有全面深入的理解。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
	{
		bookName:"JavaScript权威指南（第6版）",
		author:"朴灵",
		pubHouse:"人民邮电出版社",
		pubDate:"2013-12-06",
		comment:[],
		price: '100.00',
		discount: '9.00',
		aprice: '90.00',
		cover:"/book/cover1.jpg",
		picture:['/book/nodePic1.jpg', '/book/nodePic2.jpg', '/book/nodePic3.jpg', '/book/nodePic4.jpg'],
		editions:"1",
		pages:348,
		words:514000,
		type:"AAB",
		authorIntro:["真名田永强，文艺型码农，就职于阿里巴巴数据平台，资深工程师，Node.js布道者，写了多篇文章介绍Node.js的细节。活跃于CNode社区，是线下会议NodeParty的组织者和JSConfChina（沪JS和京JS）的组织者之一。热爱开源，多个Node.js模块的作者。叩首问路，码梦为生。"],
		stocks:900,
		saleNumber:0,
		introduce:["本书从不同的视角介绍了 Node 内在的特点和结构。由首章Node 介绍为索引，涉及Node的各个方面，主要内容包含模块机制的揭示、异步I/O 实现原理的展现、异步编程的探讨、内存控制的介绍、二进制数据Buffer的细节、Node 中的网络编程基础、Node 中的Web 开发、进程间的消息传递、Node 测试以及通过Node构建产品需要的注意事项。最后的附录介绍了Node 的安装、调试、编码规范和NPM 仓库等事宜。","本书适合想深入了解 Node 的人员阅读。"],
		scores:0,
		favorite:[],
		flag: 'extend',
	},
]
	var objOnSale = {
		bookName:"javascript权威指南",
		author:"朴灵",
		price: 61.00,
		discount:"8.92",
		cover:"book/cover.jpg",
		detail: '5709b6499180abb00defee0a'
	}
	var bookMenu = {
		value:'A',
		label:'教育',
		children:[
			{
				value:'AA',
				label:'web前端开发',
				children:[
					{
						value:'AAA',
						label:'Javascript'
					},
					{
						value:'AAB',
						label:'HTML5'
					},
					{
						value: 'AAC',
						label: 'CSS'
					},
					{
						value: 'AAD',
						label: 'Node.js'
					},
				]
			},
			{
				value:'AB',
				label:'外语',
				children:[
					{
						value:'ABA',
						label:'英语专项训练'
					},
					{
						value:'ABB',
						label:'英语读物'
					},
					{
						value:'ABC',
						label:'英语考试'
					},
					{
						value:'ABD',
						label:'小语种'
					},
					{
						value:'ABE',
						label:'日语'
					},
					{
						value:'ABF',
						label:'法语'
					},
					{
						value:'ABF',
						label:'韩语'
					},
				]
			},
			{
				value: 'AC',
				label: '考试',
				children:[
					{
						value: 'ACA',
						label: '学历考试',
					},
					{
						value: 'ACB',
						label: '公务员',
					},
					{
						value: 'ACC',
						label: '财税外贸保险',
					},
					{
						value: 'ACD',
						label: '计算机',
					},
					{
						value: 'ACE',
						label: '建筑工程',
					},
					{
						value: 'ACF',
						label: '医药卫生',
					},
					{
						value: 'ACG',
						label: '艺术/体育',
					},
					{
						value: 'ACH',
						label: '考研',
					},
					{
						value: 'ACI',
						label: 'MBA/MPA/MPAc',
					},
					{
						value: 'ACJ',
						label: '会计',
					},
					{
						value: 'ACK',
						label: '建造师',
					},
					{
						value: 'ACL',
						label: '医师资格',
					},
					{
						value: 'ACM',
						label: '人力资源管理',
					},
				]
			},
			{
				value: 'AD',
				label: '中小学教辅',
				children: [
					{
						value: 'ADA' ,
						label: '小学' ,
					},
					{
						value: 'ADB' ,
						label: '初中' ,
					},
					{
						value: 'ADC' ,
						label: '高中' ,
					},
					{
						value: 'ADD' ,
						label: '中小学阅读' ,
					},
					{
						value: 'ADE' ,
						label: '英语专项' ,
					},
					{
						value: 'ADF' ,
						label: '语文作文' ,
					},
					{
						value: 'ADG' ,
						label: '工具书' ,
					},
					{
						value: 'ADH' ,
						label: '写字/字帖' ,
					},
					{
						value: 'ADI' ,
						label: '学习方法' ,
					},
					{
						value: 'ADJ' ,
						value: '教育理论' ,
					},
				]
			}
		]
	}
	var promBookIdList = [{bookId: '571b6464dada3e7b0cbb7d72'},
						   {bookId: '571b64b1f2d21e910cec66a3'},
						   {bookId: '571b645d13a810680c5dc882'},
						   {bookId: '571b5e6e802d73070c08e9f7'},
						   {bookId: '571b594c61808b120b1efdab'},
						   {bookId: '571b593e1bcd7cc40ad7e00f'},
						   {bookId: '571b590f443ac38a0ad1799f'},
						   {bookId: '571cb729fe1e47b530f24305'},
						   {bookId: '571b8c73bef9aa9b419a1c6f'},
						   {bookId: '571b8c4ed2fd2e8741943588'},
						   {bookId: '571b8c4d0ae1847d41b495cd'},]
    // for (var i = 0; i < 10; i++) {
    // 	dataModel['bookMenu'].create(bookMenu, function(err,data){
	// 	console.log(data);
	// })
	//
    // };
	// dataModel['promBook'].create(promBookIdList,function(err, data){
	// 	console.log(data)
	// })
	//  dataModel['bookInfo'].create(obj,function(err,data){
	// 	if(err) return console.error(err);
	// })
	var bookMenuConfigObj = [
		{
			value: 'A',
			label: '教育',
		},
		{
			value: 'AA',
			label: 'web前端开发',
		},
		{
			value:'AAA',
			label:'Javascript'
		},
		{
			value:'AAB',
			label:'HTML5'
		},
		{
			value: 'AAC',
			label: 'CSS'
		},
		{
			value: 'AAD',
			label: 'Node.js'
		},
		{
			value:'AB',
			label:'外语',
		},
		{
			value:'ABA',
			label:'Mongodb'
		},
		{
			value:'ABB',
			label:'英语读物'
		},
		{
			value:'ABC',
			label:'英语考试'
		},
		{
			value:'ABD',
			label:'小语种'
		},
		{
			value:'ABE',
			label:'日语'
		},
		{
			value:'ABF',
			label:'法语'
		},
		{
			value:'ABF',
			label:'韩语'
		},
		{
			value: 'AC',
			label: '考试',
		},
		{
			value: 'ACA',
			label: '学历考试',
		},
		{
			value: 'ACB',
			label: '公务员',
		},
		{
			value: 'ACC',
			label: '财税外贸保险',
		},
		{
			value: 'ACD',
			label: '计算机',
		},
		{
			value: 'ACE',
			label: '建筑工程',
		},
		{
			value: 'ACF',
			label: '医药卫生',
		},
		{
			value: 'ACG',
			label: '艺术/体育',
		},
		{
			value: 'ACH',
			label: '考研',
		},
		{
			value: 'ACI',
			label: 'MBA/MPA/MPAc',
		},
		{
			value: 'ACJ',
			label: '会计',
		},
		{
			value: 'ACK',
			label: '建造师',
		},
		{
			value: 'ACL',
			label: '医师资格',
		},
		{
			value: 'ACM',
			label: '人力资源管理',
		},
		{
			value: 'AD',
			label: '中小学教辅',
		},
		{
			value: 'ADA' ,
			label: '小学' ,
		},
		{
			value: 'ADB' ,
			label: '初中' ,
		},
		{
			value: 'ADC' ,
			label: '高中' ,
		},
		{
			value: 'ADD' ,
			label: '中小学阅读' ,
		},
		{
			value: 'ADE' ,
			label: '英语专项' ,
		},
		{
			value: 'ADF' ,
			label: '语文作文' ,
		},
		{
			value: 'ADG' ,
			label: '工具书' ,
		},
		{
			value: 'ADH' ,
			label: '写字/字帖' ,
		},
		{
			value: 'ADI' ,
			label: '学习方法' ,
		},
		{
			value: 'ADJ' ,
			label: '教育理论' ,
		},
	]
	// dataModel['bookMenuConfig'].create(bookMenuConfigObj,function(err,data){
	// 		if(err) return console.error(err);
	// 		console.log(data,'--');
	// 	})
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
	// dataModel['bookClass'].create(obj,function(err,data){
	// 	if(err) return console.error(err);
	// 	console.log(data);
	// })
})
module.exports = dataModel;
