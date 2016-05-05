var express = require('express');
var path = require('path');
var fs = require('fs');
var schedule = require('node-schedule');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var https = require('https');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Order = require('./modules/order');

//var MongoStore = require('connect-mongo');
var routes = require('./route/index');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '/images')));
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
app.get("/*",function(req,res){
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
    //每分钟扫描订单
    var rule = new schedule.RecurrenceRule();
    var times = [];
    for(var i=1;i<60;i++) {
    	times.push(i);
    }
    rule.minute = times;
    var c = 0;
    schedule.scheduleJob(rule, function(){
        Order.filterOrder();
    })
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
var options = {
  key:fs.readFileSync(path.join(__dirname, 'ssh/key.pem'),'utf8'),
  cert:fs.readFileSync(path.join(__dirname, 'ssh/key-cert.pem'),'utf8'),
}
var httpsServer = https.createServer(options, app);
    httpsServer.listen(5001,function(){
      console.log('Example app listening at https://%s:%s', 5001, 5001)
    })
var server = app.listen(5000,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log(path.join(__dirname, '../dist'))
  console.log('Example app listening at https://%s:%s', host, port)
})


module.exports = app;
