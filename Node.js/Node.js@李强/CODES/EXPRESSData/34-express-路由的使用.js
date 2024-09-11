/* 

    路由的语法为 app.<method>(path, callback)，其中
    - method 可取 get、set、all（表示匹配所有请求方法）
    - path 可取特定路径，也可以取 *（表示匹配所有请求 URL 的路径）

    一般而言 app.all('*', callback) 表示其余情况，这是因为路由是自上向下匹配的，可以在让该路由设置响应为 Not Found

*/

// 1. 导入 express 模块
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
// 3.1 创建 GET 路由，匹配 /home 路径
app.get('/home', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h1>欢迎来到网站首页</h1>');
});

// 3.2 创建 GET 路由，匹配 / 路径
app.get('/', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h1>欢迎来到网站根目录</h1>');
});

// 3.3 创建 POST 路由，匹配 /login 路径
app.post('/login', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h1>欢迎来到登录界面</h1>');
});

// 3.4 创建匹配任意请求方法的路由，但匹配 /search 路径
app.all('/search', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h4>正在为您查找相关结果</h4>');
});

// 3.5 自定义 404 路由，本质上就是没有被其他路由匹配到的网页请求由该路由匹配并处理
app.all('*', (request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h1>404 Not Found</h1>');
});

// 4. 监听端口，启动服务
app.listen(9000, () => {
    console.log('服务已启动，监听端口 9000 ...');
});