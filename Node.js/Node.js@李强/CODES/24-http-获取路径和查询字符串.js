/* 
    我们有两种方式获取 request.url 中的路径和查询字符串：1. url 模块 2. URL 对象

    方式一：通过 url 模块（首先需要通过 const url = require('url') 导入该模块）
        - 路径 url.parse(request.url).pathname，返回的是一个字符串
        - 查询字符串 url.parse(request.url, true).query，返回的是一个对象
        - 注：通过 url.parse(request.url).query 也可以获取查询字符串，不过是字符串类型，如果加上参数 true，则获取到的是查询字符
        串的对象类型

    方式二：通过 URL 对象
        - 创建 URL 对象 const url = new URL(request.url, 'http://127.0.0.1');
        - 路径 url.pathname，返回的是一个字符串
        - 查询字符串 url.searchParams，返回的是一个 Map 类型的对象，可以通过 get(键名) 的方式获取键值

*/

/* 方式一 */

// // 1. 导入 http 模块
// const http = require('http');
// 
// // 2. 导入 url 模块
// const url = require('url');

// // 3. 创建 http 服务
// const server = http.createServer((request, response) => {
//     if (request.url !== '/favicon.ico') {
//         let pathname = url.parse(request.url).pathname;
//         let queryObj = url.parse(request.url, true).query;
//         console.log(`路径=${pathname}`);
//         console.log('查询字符串为');
//         console.log(queryObj);
//         response.setHeader('content-type', 'text/html;charset=utf-8');
//         response.end('<h1>获取路径以及查询字符串-1</h1>');
//     }
// });

// // 4. 启动 http 服务
// server.listen(9000, () => {
//     console.log('9000 端口的 http 服务启动了');
// });

/* 方式二 */

// 1. 导入 http 模块
const http = require('http');

// 2. 创建 http 服务
const server = http.createServer((request, response) => {
    if (request.url !== '/favicon.ico') {
        // 3. 创建 URL 对象
        const url = new URL(request.url, 'http://127.0.0.1:9000');
        let pathname = url.pathname;
        let queryObj = url.searchParams;
        console.log(`路径=${pathname}`);
        console.log('查询字符串为');
        console.log(queryObj);
        response.setHeader('content-type', 'text/html;charset=utf-8');
        response.end('<h1>获取路径以及查询字符串-2</h1>');
    }
});

// 4. 启动 http 服务
server.listen(9000, () => {
    console.log('9000 端口的 http 服务启动了');
});