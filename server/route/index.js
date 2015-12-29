app.post('/login',function(req, res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	User.get(req.body.username,function(err, user){
		if(!user){
			req.flash('error','用户名不存在');
			return res.redirect('/login')
		}
		if(user.password !=password) {
			req.flash('error','用户口令错误');
		}
		req.session.user = user;
		req.flash('success','登入成功');
		res.redirect('/')
	})
}