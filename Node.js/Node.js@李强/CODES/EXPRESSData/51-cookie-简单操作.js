const express = require('express');
const cookieParser = require('cookie-parser');
/* 
    `cookieParser` 是 Express 框架中的一个中间件，其作用是解
    析客户端请求中的 cookie 数据，并将解析后的 cookie 数据
    附加到请求对象 (request) 上，以便在后续的路由处理中可以
    方便地访问和操作这些 cookie 数据。
*/
const app = express();

app.use(cookieParser());

/* 
    设置 cookie 的两种方式
    - response.cookie('键名', '键值');
        - 不带时效性地设置 cookie
        - 这种方式设置的 cookie 会在浏览器关闭的时候销毁
    - response.cookie('键名', '键值', {maxAge: Number});
        - 带时效性地设置 cookie
        - 这种方式设置的 cookie 会在 maxAge 毫秒后销毁（浏览器关闭时不会销毁）
*/
app.get('/set-cookies', (_, res) => {
    res.cookie('username', 'yiTu'); // 设置 cookie：不带时效性
    res.cookie('user_id', 'HUiu_sad87%4$a')
    res.cookie('email', '12345@qq.com', { maxAge: 60 * 1000 }); // 设置 cookie：带时效性
    res.send('<h1>cookie 设置成功</h1>'); // 响应
});

/* 
    读取 cookie 的方式：request.cookies（通过包 cookie-parser 实现）
*/
app.get('/get-cookies', (req, res) => {
    let cookies = req.cookies;
    console.log(cookies);
    res.send('<h1>cookie 读取成功</h1>');
});

/* 
    删除 cookie 的方式：response.clearCookie('键名')
*/
app.get('/clear-cookies', (_, res) => {
    res.clearCookie('username');
    res.send('<h1>cookie 删除成功</h1>')
});

app.listen(9000, () => {
    console.log("9000 端口的 express 服务已启动...");
})
