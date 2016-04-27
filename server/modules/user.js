var db = require('../db');
var _pick = require('lodash/pick');
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
				res.send({phone:user.phone,id:user["_id"],data:{'favorite': user.favorite}});
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
			var obj = _pick(userInfo,['favorite']);
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
		console.log(message,"!!!!!!!!!!!!!!!!1")
		if(message!=""){
			res.statusCode=404;
			res.send({errorCode:404501,message:"提交的表单信息不合法"})
		}else{
			var baseInfo = {
				sex:0,
				birthday:"",
				headImg:"",
				identity:"",
				address:"",
				addressStatus:"",
				interests:"",
				lovePerson:"",
				introduce:"",
				ShippingAddress:[],
			}
			var baseInfoId = "123";
			saveOne(baseInfo,'baseInfo',function(err,item){
				if(item){
					console.log(baseInfoId,".............")
					console.log(item,item["_id"]);
					baseInfoId = item["_id"];
					console.log(baseInfoId,"======")
				}
				var obj = {
					phone:phone,
					password:password,
					userName:userName,
					baseInfoId:baseInfoId,
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
			})
		}
	});
}
Users.logout = function(req,res){
	res.clearCookie('bookstore');
	res.end();
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
