const express = require('express');
const preflightRouter = require('./utils/routers/preflight'); // 路由：处理预检请求
const corsMiddleware = require('./utils/middlewares/cors'); // 中间件：允许跨域请求和自定义的请求头

const app = express();

app.use(preflightRouter); // 预检请求（OPTIONS）路由
app.use(corsMiddleware);

// get 路由
app.get('/server', (_, res) => {
    res.send('<h1>Hello Ajax!</h1>');
});

// post 路由
app.post('/server', (_, res) => {
    res.send('<h1>Post Ajax!</h1>');
});

// JSON 响应
app.get('/json-server', (_, res) => {
    let person = { name: "孙悟空", age: 19, gender: "男" };
    res.json(person);
});

// ie 缓存
app.get('/ie', (_, res) => {
    res.send('<h1>Hello IE!</h1>')
});

// 延时响应
app.get('/delay', (_, res) => {
    setTimeout(() => {
        res.send('<h1>延时响应</h1>')
    }, 3000);
});

// jQuery 服务
app.all('/jquery-server', (_, res) => {
    res.send('<h1>Hello jQuery Ajax</h1>');
});

// axios 服务
app.all('/axios-server', (_, res) => {
    res.send('<h1>Hello axios Ajax</h1>');
});

// 404 路由规则
app.all('*', (_, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
});

app.listen(9000, () => {
    console.log('Express 服务已启动，正在监听 9000 端口...');
});