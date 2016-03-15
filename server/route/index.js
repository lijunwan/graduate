var express = require('express');
var app = express();
var router = express.Router();
var User = require('../modules/user.js');
app.post('/api/user/login',function(req, res) {
	// var md5 = crypto.createHash('md5');
	// var password = md5.update(req.body.password).digest('base64');
	console.log("user")
	console.log(User.find,"123")
	User.find(function(err, user){
		// if(!user){
		// 	req.flash('error','用户名不存在');
		// 	return res.redirect('/login')
		// }
		// if(user.password !=password) {
		// 	req.flash('error','用户口令错误');
		// }
		// req.session.user = user;
		// req.flash('success','登入成功');
		// res.redirect('/');
		res.setHeader('Content-Type','application/json');
	 res.end('ok');
	   
	})
	
	})
module.exports = app;
