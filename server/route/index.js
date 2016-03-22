var express = require('express');
var app = express();
var router = express.Router();
var User = require('../modules/user.js');
app.post('/api/user/login',User.checkLogin);
app.get('/api/log',User.isLogin);
app.get('/api/user/phone',User.checkPhone);
app.post('/api/user/register',User.createUser);
module.exports = app;
