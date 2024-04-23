/* 
    在代码27的基础上，我们尝试解决了一个新问题：当网页中引入了外部 CSS 和 JavaScript 文件时，使用相同的服务器响应代码，浏览器在解
    析 HTML 文件时会发现这些外部文件的导入标签，然后会向服务器发出额外的请求。然而，由于我们的服务器代码对所有请求都返回相同的 HTML
    文件，导致浏览器无法加载 CSS 和 JavaScript 文件，最终页面无法正常显示。

    为了解决这个问题，我们需要根据浏览器请求的路径不同，设置不同的响应体内容，以正确返回 CSS 和 JavaScript 文件。这样，浏览器就能
    够根据 HTML 文件中的路径引入正确的外部资源，从而正常渲染页面。

    -----------------------------------------------------------------------------------------------------

    在这个解决方案中，我们实现了一个简单的 HTTP 服务器，用于处理浏览器请求不同类型的资源文件（HTML、CSS、JS）。

    当浏览器向服务器发出请求时，服务器根据请求的 URL 路径来区分请求的资源类型，然后分别返回对应的资源文件。

    - 当浏览器请求 `/index.html` 路径时，服务器返回 HTML 文件。
    - 当请求 `/css/app.css` 路径时，返回 CSS 文件。
    - 当请求 `/js/app.js` 路径时，返回 JS 文件。

    这种方法可以确保浏览器能够正确加载HTML文件所需的外部资源（如CSS和JS文件），从而正常渲染页面。
 */

const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
    let { pathname } = new URL(request.url, 'http://127.0.0.1');
    if (pathname === '/index.html') { // 加载 html
        fs.readFile(path.resolve(__dirname, './HTTPData/page/index.html'), (err, data) => {
            if (err) {
                notFound(response);
            } else {
                response.setHeader('content-type', 'text/html;charset=utf-8');
                found(response, data);
            }
        });
    } else if (pathname === '/css/app.css') { // 加载 css
        fs.readFile(path.resolve(__dirname, './HTTPData/page/css/app.css'), (err, data) => {
            if (err) {
                notFound(response);
            } else {
                response.setHeader('content-type', 'text/css;charset=utf-8');
                found(response, data);
            }
        });
    } else if (pathname === '/js/app.js') { // 加载 js
        fs.readFile(path.resolve(__dirname, './HTTPData/page/js/app.js'), (err, data) => {
            if (err) {
                notFound(response);
            } else {
                response.setHeader('content-type', 'text/js;charset=utf-8');
                found(response, data);
            }
        });
    } else {
        notFound(response);
    }

    function notFound(response) {
        response.statusCode = 404;
        response.setHeader('content-type', 'text/plain;charset=utf-8');
        response.end('File Not Found');
    }

    function found(response, data) {
        response.statusCode = 200;
        response.end(data); // 注意：end 接受 String 参数，也接受 Buffer 参数
    }


});

server.listen(9000, () => {
    console.log('服务已启动...');
})