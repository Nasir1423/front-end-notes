/* 
    我们希望实现功能

    1. GET  /login 时显示表单网页，提示用户输入用户名和密码
    2. POST /login 时获取表单中的用户名信息和密码信息，并在控制台输出
*/
// 导入相关包
const express = require('express');
const bodyParser = require('body-parser');

// 获取解析查询字符串形式的请求体的中间件函数
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// 创建应用对象
const app = express();

// 创建 GET 路由：显示登录页面（表单，提示用户输入用户名和密码）
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '\\form_of_user_info.html');
});

// 创建 POST 路由：获取当前请求体中的数据并输出（输出用户名和密码
// urlencodedParser 中间件用于获取当前请求的请求体中的数据
app.post('/login', urlencodedParser, (req, res) => {
    let responseBody = req.body;
    console.log('登录数据为');
    for (const key in responseBody) {
        console.log(`${key} = ${responseBody[key]}`);
    }
    res.send('已获取用户数据')
});

app.listen(9000, () => {
    console.log('9000 端口已启动');
})