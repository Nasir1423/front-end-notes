/* 
    在 28 的基础上，搭建静态资源服务，从而无需复杂繁琐的 if-else 判断

    我们根据以下规则来处理不同的请求：
        - 当浏览器请求 `/index.html` 路径时，返回 HTML 文件。
        - 当浏览器请求 `/css/app.css` 路径时，返回 CSS 文件。
        - 当浏览器请求 `/js/app.js` 路径时，返回 JS 文件。

    我们观察到：
        - HTML 文件的路径是 `./HTTPData/page/index.html`。
        - CSS 文件的路径是 `./HTTPData/page/index.html`。
        - JS 文件的路径是 `./HTTPData/page/index.html`。
    
    我们发现了一个规律：文件存放在本地的绝对路径等于 __dirname（服务器所在的绝对路径）+ `/HTTPData/page` + 浏览器请求路径。
        - 浏览器请求路径可以通过 `response.url` 获取。

    现在，我们的服务器可以根据浏览器请求的路径动态地返回相应的资源文件，从而有效地提供静态资源服务。
*/

const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
    let { pathname } = new URL(request.url, 'http://127.0.0.1');
    let filePath = path.join(__dirname, '/HTTPData/page', pathname);
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.statusCode = 404;
            response.end('File Not Found');
        } else {
            response.statusCode = 200;
            response.end(data); // 注意：end 接受 String 参数，也接受 Buffer 参数
        }

    });
})


server.listen(9000, () => {
    console.log('服务已启动...');
})