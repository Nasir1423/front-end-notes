// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
var regRouter = require('./routes/web/auth');
var apiRouter = require('./routes/api/ledger-info-api');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const { DBHOST, DBPORT, DBNAME } = require('./config/config.json');

var app = express();

app.use(session({
  name: "session_id", // 返回给浏览器的 cookie 名称，值对应 session 的 id，用于用户身份校验
  secret: 'chuanyitu', // 用于签名的字符串（参与加密）
  saveUninitialized: false, // 设置是否每次请求都设置一个 cookie 用于存储 session 的 id
  resave: true, // 是否在每次请求都重新保存 session 的内容
  store: MongoStore.create({ // 指定 session 的存储方式，这里将 session 存储到 MongoDB 数据库中
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` // 数据库的链接配置
  }),
  cookie: { // 配置返回给浏览器的 cookie 的特性
    httpOnly: true, // true 则表示前端无法通过 JS 操作该 cookie，提高了安全性
    maxAge: 1000 * 60 * 10 // 该 cookie 的生命周期，同时也是后端 session 的生命周期
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', regRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render('error-404');
  // next(createError(404));
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
