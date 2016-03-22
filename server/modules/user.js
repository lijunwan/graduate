var db = require('../db');
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
					'lastTime':Date().toString()
				}
				res.cookie("bookstore",obj,{maxAge:600000})
			    saveOne(obj,"logs",function(err,item){
			    	console.log(item,"123")
			    });
			    res.statusCode=200;
				res.send({phone:user.phone,id:user["_id"]});
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
		res.send({'phone':req.cookies.bookstore.phone,'id':req.cookies.bookstore.id})
	}else{
		res.statusCode=401;
		res.send({errorCode:401400,message:"未登录"})
	}

}
Users.checkPhone = function checkPhone(req,res){
	findOne({phone:req.body.phone},'users',function(err,data){
		if(data){
			res.statusCode=404;
			res.send({errorCode:404500,message:"手机号被占用"})
		}else{
			res.statusCode=200;
			res.send({status:"ok"})
		}
	});
}
Users.createUser = function createUser(req,res) {
	var message =""
  var reg = /^[1][358][0-9]{9}$/;
	var phone = req.body.phone;
	var userName = req.body.userName;
	var password = req.body.password;
	 findOne({phone:req.body.phone},'users',function(err,data){
		if(data){
		 var message = "手机号被占用 "
		}
		return message
	});
	console.log(str,"message")
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
		var baseInfoId = "";
		saveOne(baseInfo,'baseInfo',function(err,item){
			if(item){
				console.log(item,item["_id"]);
				baseInfoId = item["_id"]
			}
		})
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
	}

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
