var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var MongoStore = require('connect-mongo');
var routes = require('./route/index');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/",function(req,res){
     var options={
          root:'dist'
     }
     res.sendFile("index.html",options,function(err){
          if(err){
            console.log(err);
            res.status(err.status).end();
          }
     })
})
app.get("/app.min.js",function(req,res){
     var options={
          root:'dist/assets/app/js/'
     }
     res.sendFile("app.min.js",options,function(err){
          if(err){
            console.log(err);
            res.status(err.status).end();
          }
     })
})
app.use('/', routes);
// 404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
var server = app.listen(3333,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
})


module.exports = app;
