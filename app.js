//加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cors = require('cors');

//路由控制
var routes = require('./routes/index');
//var users = require('./routes/user');
var zhichu = require('./routes/zhichuPath');
var shouru = require('./routes/shouruPath');
var home = require('./routes/homePath');
var user = require('./routes/userPath');
var zone = require('./routes/zonePath');
var app = express();

//app.use(cors());
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

app.use(function (req, res, next) {
  var url = req.originalUrl;//获取浏览器中当前访问的nodejs路由地址；
  var userCookies=req.cookies.user; //获取客户端存取的cookie,userCookies为cookie的名称；//有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块，//因此，获取cookie必须在1,2步之后才能使用，否则拿到的cookie就是undefined.
  if (url != "/login" && !userCookies && url!="/user/login") {
    return res.redirect("/login");
  }
  next();
});

//匹配路径和路由
app.use('/', routes);
app.use('/zhichu',zhichu);
app.use('/shouru',shouru);
app.use('/home',home);
app.use('/user',user);
app.use('/zone',zone);

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
