//加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

//路由控制
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(cors());
//
app.set('views',path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));

//数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
//app.use('/vendor',express.static(path.join(__dirname, '/vendor')));
// app.use('/dist',express.static(path.join(__dirname, '/public/dist')));
// app.use('/js',express.static(path.join(__dirname, '/public/js')));
// app.use('vendor',express.static(path.join(__dirname, '/public/vendor')));

//匹配路径和路由
app.use('/', routes);
//app.use('/users', users);
//app.use('/home',routes);
//app.use('/shouru',routes);
//app.use('/zhichu',routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
