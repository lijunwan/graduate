var express = require('express');
var app = express();
var router = express.Router();
var User = require('../modules/user.js');
app.post('/api/user/login',function(req, res) {
	User.findOne({account:req.body.account},function(err, user){
		if(err){
			res.statusCode=400;
			res.send({errorCode:400400,message:"未知错误"})
		}
		else if(!user){
			res.statusCode=400;
			res.send({errorCode:400401,message:"用户名不存在"})
		}
		else if(user){
			console.log(req.body.password)
			if(user.password == req.body.password){
				res.statusCode=200;
				res.send({phone:user.account,id:user["_id"]});
			}else{
				 res.statusCode=404;
				 res.send({errorCode:400403,message:"密码错误"})
			}
		}else{
			 res.statusCode=400;
			 res.send({errorCode:400400,message:"未知错误"})
		}
	})

	})
module.exports = app;
