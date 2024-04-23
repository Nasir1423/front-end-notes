/* 

    练习：使用全局中间件实现记录浏览器的请求日志

        - 当浏览器发出一个请求到服务器后，服务器记录本次请求的 URL 的路径和 IP 到一个本地文件中
        - 此外，
            - 如果路径是 /home 输出 “网站首页”
            - 如果路径是 /login 输出是 “登录页面”
            - 如果路径是 /register 输出是 “注册页面”
*/

const fs = require('fs');
const express = require('express');
const app = express();
let requestLogPath = './request-log.txt';

// 全局中间件实现请求日志的记录
app.use((request, _, next) => {
    let { url, ip } = request;
    fs.appendFileSync(requestLogPath, `${url}    ${ip}\r\n`);
    next(); // 继续执行后续的中间件或路由回调
});

app.get('/home', (_, response) => {
    response.send('网站首页');
});

app.get('/login', (_, response) => {
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