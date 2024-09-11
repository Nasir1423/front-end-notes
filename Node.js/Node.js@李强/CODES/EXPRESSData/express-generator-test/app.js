var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// 设置模板引擎和模板文件存放位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); // 设置请求体
app.use(express.urlencoded({ extended: false })); // 设置请求体
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态资源目录

// 加载路由规则，同时设置路由前缀
/* 
  关于路由前缀：一旦在 app.use 中设置了路由前缀，则其中的路由规则默认有该前缀内容，例如，
  app.use('/users', usersRouter);
  此时，如果 usersRouter 中的请求路径是 
    - /，则实际上表示 /users
    - /info，则实际上表示 /users/info
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 这个 404 处理类似于 app.all('*', (_, res) => { res.status(404) })
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
