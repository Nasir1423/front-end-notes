/* 
    在 29 的基础上增加
        1. 明确指名静态资源目录 rootDir，直接根据静态资源目录与浏览器的请求路径在服务端查询静态资源 
        2. 对不同的静态资源，设置对应的 MIME 类型
            - 如果请求的资源类型是预设好的，如 png、html、js、css 等，则设置 content-type 为指定的 MIME 类型
            - 否则，设置 content-type 为 application/octet-stream 类型
        3. 对网页中的不同错误进行相应的处理
            - 请求方式不是 GET =》 响应状态码为 405；响应体内容为 405 Method Not Allowed
            - 读取错误 err.code
                - ENOENT =》 响应状态码为 404；响应体内容为 404 Not Found
                - EPERM =》 响应状态码为 403；响应体内容为 403 Forbidden
                - 其他错误代码 =》 响应状态为 500；响应体内容为 500 Internal Server Error
*/

const fs = require('fs'); // fs 模块，用于文件读写
const http = require('http'); // http 模块，用于设置服务
const path = require('path'); // path 模块，用于路径提取
const mimeObj = { // mime 映射对象，根据文件类型属性名，获取 mime 属性值
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
    json: 'application/json'
}

const server = http.createServer((request, response) => {
    // 1. 检查请求方法必须是 GET
    const { method } = request; // 请求方法
    if (method.toUpperCase() !== 'GET') {
        response.statusCode = 405;
        response.end('<h1>405 Method Not Allowed</h1>');
        return;
    }
    // 2. 根据静态资源目录和浏览器的请求路径获取资源在服务器的绝对路径
    const rootDir = __dirname + '/HTTPData/page'; // 静态资源目录
    const { pathname } = new URL(request.url, 'http://127.0.0.1'); // 请求路径
    const filePath = path.join(rootDir, pathname); // 请求资源在服务器端的绝对路径
    fs.readFile(filePath, (err, data) => {
        if (err) { // 错误处理
            response.setHeader('content-type', 'text/html;charset=utf-8')
            const errCode = err.code;
            switch (errCode) {
                case 'ENOENT':
                    response.statusCode = 404;
                    response.end('<h1>404 Not Found</h1>');
                    break;
                case 'EPERM':
                    response.statusCode = 403;
                    response.end('<h1>403 Forbidden</h1>');
                    break;
                default:
                    response.statusCode = 500;
                    response.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            // 3. 获取资源的类型 css、html、js
            const ext = path.extname(pathname).split('.')[1];
            const type = mimeObj[ext];
            if (type) { // 预设资源类型
                if (ext === 'html') { // 只需要设置网页的字符集
                    response.setHeader('content-type', `${type};charset=utf-8`);
                } else {
                    response.setHeader('content-type', type);
                }
            } else { // 非预设资源类型
                response.setHeader('content-type', 'application/octet-stream');
            }

            response.statusCode = 200;
            response.end(data); // 注意：end 接受 String 参数，也接受 Buffer 参数
        };
    });
});


server.listen(9000, () => {
    console.log('9000 端口的服务已启动...');
})