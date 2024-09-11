/* 
    我们可以通过监视 request 对象的 data 和 end 事件获取请求报文的请求体信息

    1. request.on('data', chunk => {}) 
        - 描述：给 request 的 data 事件绑定一个响应函数，每次从请求报文的请求体中读取一块数据，该响应函数就会被调用一次，同时会将
        读取的这块数据作为响应函数的参数传入
        - 注意
            - 通过监视 request 的 data 事件，我们得以获取请求报文的请求体信息
            - data 事件的响应函数接受的参数 chunk 是一个 Buffer 对象
            - data 事件的响应函数可能会多次调用
    2. request.on('end', () => {})
        - 描述：为 request 的 end 事件绑定一个响应函数，当请求体读取完毕后，会自动调用其中的响应函数
        - 注意：end 事件的响应函数只会调用一次
    3. 注：GET 方式的请求报文的请求体是空的

*/

// 1. 导入 http 模块
const http = require('http');

// 2. 创建 http 服务
const server = http.createServer((request, response) => {
    if (request.url !== '/favicon.ico') {
        let body = '';
        request.on('data', (chunk) => {
            console.log('正在读取请求报文中的请求体内容~~~');
            body += chunk; // 注：Buffer 对象在做 + 运算时，会自动转换为 String 数据类型
        });

        request.on('end', () => {
            console.log('请求信息读取完毕~~~');
            // 请求体信息
            console.log("==================================================================");
            console.log("> 请求体信息");
            console.log(body);
            console.log("==================================================================");
        });
    }
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h1>获取请求体</h1>');
});

// 3. 启动 http 服务
server.listen(9000, () => {
    console.log('9000 端口的 http 服务启动了');
});