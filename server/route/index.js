var express = require('express');
var app = express();
var router = express.Router();
var User = require('../modules/user.js');
app.post('/api/user/login',function(req, res) {
	// var md5 = crypto.createHash('md5');
	// var password = md5.update(req.body.password).digest('base64');

	User.findOne({"account":req.body.account},function(err, user){
		if(err){
			console.log(err);
		}else if(user.length<1){
			res.setHeader('Content-Type','application/json');
			res.end("用户名不存在")
		}else{
			res.setHeader('Content-Type','application/json');
      res.end(user)
		}
		console.log(user)

		// if(!user){
		// 	res.end('error');
		// }else{
		// 	res.end('ok');
		// }
		// if(user.password !=password) {
		// 	req.flash('error','用户口令错误');
		// }
		// req.session.user = user;
		// req.flash('success','登入成功');
		// res.redirect('/');
		console.log(user,"123456")
	})

	})
module.exports = app;
