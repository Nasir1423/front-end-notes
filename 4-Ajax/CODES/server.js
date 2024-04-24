const express = require('express');
const corsMiddleware = require('./utils/middlewares/cors'); // 中间件：允许跨域请求和自定义的请求头
const preflightRouter = require('./utils/routers/preflight'); // 路由：处理预检请求

const app = express();

app.use(corsMiddleware); // 使用中间件
app.use(preflightRouter); // 使用路由

// get 路由
app.get('/server', (_, res) => {
    res.send('<h1>Hello Ajax!</h1>');
});

// post 路由
app.post('/server', (_, res) => {
    res.send('<h1>Post Ajax!</h1>');
});

// 404 路由规则
app.all('*', (_, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
});

app.listen(9000, () => {
    console.log('Express 服务已启动，正在监听 9000 端口...');
});