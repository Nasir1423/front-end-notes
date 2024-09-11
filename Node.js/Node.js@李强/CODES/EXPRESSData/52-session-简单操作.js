const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
/* 
    1. express-session 包
        -  Express 中间件，用于处理会话管理。它提供了一种简单的方法来创建会话对象，
        并将会话数据存储在内存中或者其他指定的存储介质中（比如数据库）
    2. connect-mongo 包
        - 基于 MongoDB 的 session 存储引擎，用于将 Express 中间件 express-session 创
        建的会话数据存储到 MongoDB 数据库中。
*/

const app = express();

// session 的配置
app.use(session({
    name: "session_id", // 返回给浏览器的 cookie 名称，值对应 session 的 id，用于用户身份校验
    secret: 'chuanyitu', // 用于签名的字符串（参与加密）
    saveUninitialized: false, // 设置是否每次请求都设置一个 cookie 用于存储 session 的 id
    resave: true, // 是否在每次请求都重新保存 session 的内容
    store: MongoStore.create({ // 指定 session 的存储方式，这里将 session 存储到 MongoDB 数据库中
        mongoUrl: 'mongodb://127.0.0.1:27017/session' // 数据库的链接配置
    }),
    cookie: { // 配置返回给浏览器的 cookie 的特性
        httpOnly: true, // true 则表示前端无法通过 JS 操作该 cookie，提高了安全性
        maxAge: 1000 * 60 * 5 // 该 cookie 的生命周期，同时也是后端 session 的生命周期
    }
}));

// 创建 session => request.session.键名 = 键值
app.get('/login', (req, res) => {  
    req.session.username = 'chuanyitu';
    req.session.email = '12345@qq.com';
    res.send('<h1>登录成功</h1>'); // 此时可以在数据库中看到 session 的内容；可以在浏览器看到名为 session_id 的 cookie
})

// 获取 session => request.session.键名
app.get('/', (req, res) => {
    if (req.session.username) { // 表示对应 cookie（session_id）的 session 不为空，即该用户已经登录 
        res.send(`<h1>欢迎回来, ${req.session.username}</h1>`)
    } else {
        res.send('<h1>请<a href="/login">登录</a></h1>')
    }
});

// 删除 session => request.session.destroy(() => {})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('<h1>成功退出！</h1>')
    });
});

app.listen(9000, () => {
    console.log("9000 端口的 express 服务已开启");
});