var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo');
var settings = require('./Settings');

var app = express();
app.configure(function(){
      app.use(express.bodyParser());//express.bodyParser()是Cookie解析的中间件
      app.use(express.methodOverride());
      app.use(express.cookieParser());
      app.use(express.router(routes));
      app.use(express.session({//express.session提供会话支持
            secret: settings.cookieParser,
            store:new MongoStore({//把会话信息存储到数据库中避免丢失
              db:settings.db
            })
      }));
});
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
app.get("/app.js",function(req,res){
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
var server = app.listen(3000,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
})


module.exports = app;
