var db = require('../db');
function Users (user) {
	this.account = user.account;
	this.password = user.password;
}
module.exports = Users;
Users.checkLogin = function checkLogin(req,res){
	findOne({account:req.body.account},'users',function(err, user){
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
					'account':user.account,
					'id':user["_id"],
					'lastTime':Date().toString()
				}
				res.cookie("bookstore",obj,{maxAge:600000})
			    saveOne(obj,"logs",function(err,item){
			    	console.log(item,"123")
			    });
			    res.statusCode=200;
				res.send({account:user.account,id:user["_id"]});
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
		res.send({'account':req.cookies.bookstore.account,'id':req.cookies.bookstore.id})
	}else{
		res.statusCode=401;
		res.send({errorCode:401400,message:"未登录"})
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
