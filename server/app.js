var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
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
