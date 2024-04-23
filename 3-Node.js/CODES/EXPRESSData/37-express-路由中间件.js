/* 

    练习：使用路由中间件实现，当请求路径为 /home 或 /login 时，要求 URL 必须携带查询字符串 code=200，否则提示 “暗号错误”
        - 其中，
            - 如果路径是 /home 输出 “网站首页”
            - 如果路径是 /login 输出是 “登录页面”
            - 如果路径是 /register 输出是 “注册页面”
*/

const fs = require('fs');
const express = require('express');
const app = express();

// 全局中间件实现多个路由查询字符串的检查
function checkQueryMiddleware(request, response, next) {
    if (request.query.code === '200') {
        // next();
        next();
    } else {
        response.send('暗号错误');
    }
}

app.get('/home', checkQueryMiddleware, (_, response) => {
    response.send('网站首页');
});

app.get('/login', checkQueryMiddleware, (_, response) => {
    response.send('登录页面');
});

app.get('/register', (_, response) => {
    response.send('注册页面');
});

app.all('*', (_, response) => {
    response.status(404).send('404 Not Found');
})

app.listen(9000, () => {
    console.log('监视 9000 端口的服务已启动...');
})