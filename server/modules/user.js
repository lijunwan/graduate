var db = require('../db');
var _pick = require('lodash/pick');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var __assign = require('lodash/assign');
var __remove = require('lodash/remove');
var __findIndex = require('lodash/findIndex');
function Users (user) {
	this.phone = user.phone;
	this.password = user.password;
}
module.exports = Users;
Users.checkLogin = function checkLogin(req,res){
	findOne({phone:req.body.phone},'users',function(err, user){
		if(err){
			res.statusCode=404;
			res.send({errorCode:400400,message:"未知错误"})
		}
		else if(!user){
			res.statusCode=404;
			res.send({errorCode:400401,message:"用户名不存在"})
		}
		else if(user){
			console.log(req.body.password)
			if(user.password == req.body.password){

				var obj = {
					'phone':user.phone,
					'id':user["_id"],
					'lastTime':Date().toString(),
				}
				res.cookie("bookstore",obj,{maxAge:6000000})
			    saveOne(obj,"logs",function(err,item){
			    	console.log(item,"123")
			    });
			    res.statusCode=200;
				res.send({
					phone:user.phone,
					id:user["_id"],
					data:
					{
						'favorite': user.favorite,
						'headImg': user.headImg,
						'ShippingAddress': user.ShippingAddress
					}
				});
			}else{
				 res.statusCode=404;
				 res.send({errorCode:400403,message:"密码错误"})
			}
		}else{
			 res.statusCode=400;
			 res.send({errorCode:400400,message:"未知错误"})
		}
	})

}
Users.isLogin = function isLogin(req,res){
	res.setHeader('Content-Type','application/json');
	if(req.cookies.bookstore){
		db['users'].findUserById(req, res, req.cookies.bookstore.id, function(userInfo){
			var obj = _pick(userInfo,['favorite', 'headImg','ShippingAddress']);
			res.send({'phone':req.cookies.bookstore.phone,'id':req.cookies.bookstore.id,data: obj})
		})
	}else{
		res.statusCode=401;
		res.send({errorCode:401400,message:"未登录"})
	}

}
Users.checkPhone = function checkPhone(req,res){
	findOne({phone:req.query.phone},'users',function(err,data){
		console.log(err,data,req.query.phone,"///////")
		if(data){
			res.statusCode=404;
			res.send({errorCode:404500,message:"手机号被占用"})
		}else if(err){
			res.statusCode=404;
			res.send({errorCode:404503,message:"未知错误"})//数据库错误
		}else{
			res.statusCode=200;
			res.send({status:"ok"})//数据库错误
		}
	});
}
Users.createUser = function createUser(req,res) {
	var message =""
  var reg = /^[1][358][0-9]{9}$/;
	var phone = req.body.phone;
	var userName = req.body.userName;
	var password = req.body.password;
	//必须等查询完手机号，才能执行下面的代码，所以后面的所有逻辑都应该写在回调函数内
	findOne({phone:req.body.phone},'users',function(err,data){
		if(data){
		  message += "手机号被占用 "
		}
		if(!reg.test(phone)){
			message+="手机号不合法 ";
		}
		if(userName.length<2 || userName.length>20){
			message+="用户名为2-20个字符 ";
		}
		if(password.length<6 || password.length>20) {
			message+="密码为6-20个字符 ";
		}
		if(password != req.body.twicePass){
				message+="两次密码不一致 ";
		}
		if(message!=""){
			res.statusCode=404;
			res.send({errorCode:404501,message:"提交的表单信息不合法"})
		}else{
				var obj = {
					phone:phone,
					password:password,
					userName:userName,
					headImg: '/user/userDefaultHeadImg.png',
				}
				saveOne(obj,'users',function(err,item){
					if(item){
						res.statusCode=200;
						res.send({status:"ok"})
					}else{
						res.statusCode=404;
						res.send({errorCode:404502,message:"注册用户失败"})
					}
				})
		}
	});
}
Users.logout = function(req,res){
	res.clearCookie('bookstore');
	res.end();
}
Users.UploadImg = function(req, res) {
	const dir = path.join(__dirname, '../images/user');
	var form = new formidable.IncomingForm();   //创建上传表单
    // form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = dir;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
		form.parse(req, function(err, fields, files) {
			console.log(err, '====');
			const type = files.file.name.split('.')[1];
			var newPath = dir +'/'+ req.cookies.bookstore.id +'.' +type;
		 fs.renameSync(files.file.path, newPath);
		 var headImgUrl = '/user/'+ req.cookies.bookstore.id +'.' +type;
		 db['users'].findByIdAndUpdate(req.cookies.bookstore.id, {headImg: headImgUrl},{new:true},function(error, data) {
	 		if(error) console.error(error);
	 		if(data) {
	 			res.send({data: 'ok'});
	 		}
	 	})
	})
}
Users.modifyBaseInfo = function(req, res) {
	var id = req.cookies.bookstore.id;
	console.log(req.query)
	var fileds = ['birthday','name','sex','userName','phone','headImg'];
	db['users'].findByIdAndUpdate(id, req.query,{new:true},function(error, data) {
		if(error) console.error(error);
		if(data) {
			var obj = _pick(data, fileds);
			res.send({data: obj});
		}
	})
}
Users.getUserInfo = function(req, res) {
	var id = req.cookies.bookstore.id;
	var fileds = ['birthday','name','sex','userName','phone','headImg'];
	db['users'].findById(id, function(error, data){
		if(error) console.error(error);
		if(data) {
			var obj = _pick(data, fileds);
			res.send({data: obj});
		}
	})
}

Users.updatePassWord = function(req, res) {
	var id = req.cookies.bookstore.id;
	db['users'].findById(id, function(error, user){
		if(error) console.error(error);
		if(user) {
			if(user.password == req.body.prePass){
				user.password = req.body.newPass;
				user.save();
				res.send({data: 'ok'})
			} else {
				res.statusCode = 404;
				res.send({errorCode: 404602, message: '原始密码输入错误'})
			}
		}
	})
}
Users.addAddress = function(req, res) {
	var id = req.cookies.bookstore.id;
	var obj = __assign({},req.query);
	if(obj.id) {
		db['users'].findById(id, function(error,data){
			if(data) {
				//console.log('----',data)
				var index = __findIndex(data.ShippingAddress, function(item) {
					console.log('----',item.id)
					if(item.id == obj.id) {
						return true;
					}
					return false;
				})
				console.log('----',index);
				if(index>=0) {
					data.ShippingAddress[index] = obj;
					data.markModified('ShippingAddress');
					data.save();
					res.send({data: data.ShippingAddress})
				} else {
					res.send({errorCode:'404401', message: '地址信息操作失败'})
				}
			}
		});
	} else {
		db['users'].findById(id, function(error,data){
			if(data) {
				obj['id'] = new mongoose.Types.ObjectId
				data.ShippingAddress.push(obj);
				data.save();
				res.send({data: data.ShippingAddress})
			}
		})
	}
}
Users.getAddress = function(req, res) {
	var id = req.cookies.bookstore.id;
	db['users'].findById(id, function(error,data){
		if(data) {
			res.send({data: data.ShippingAddress})
		}
	})
}
Users.delAddress = function(req, res) {
	var id = req.cookies.bookstore.id;
	var addressId = req.query.addressId;
	db['users'].findById(id, function(error,data){
		if(data) {
			var newAddress = __remove(data.ShippingAddress, function(obj) {
				if(obj['id'] == addressId) {
					return true;
				}
			})
			data.ShippingAddress = newAddress;
			data.save();
			res.send({data: data.ShippingAddress})
		}
	})
}
function findOne(obj,dataBase,callback) {
  db[dataBase].findOne(obj,function(err,item){
		if(err) return console.error(err);
	  callback(err,item);
	})
}
function saveOne(obj,dataBase,callback){
	db[dataBase].create(obj,function(err,item){
		if(err) return console.error(err);
		callback(err,item);
	});
}
