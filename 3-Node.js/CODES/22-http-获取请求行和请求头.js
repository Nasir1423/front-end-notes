/* 
    我们可以通过 request 对象获取请求行和请求头的信息

    1. 获取请求行
        - 获取请求方法：request.method
        - 获取请求路径：request.url
        - 获取请求 http 版本：request.httpVersion
    2. 获取请求头：request.headers，返回一个对象（属性名全部转换为小写）
    3. 注意事项
        - request.url 只能获取 URL 中的路径和查询字符串，无法获取 URL 中的域名（如 www.baidu.com）以及协议（如 http）
        - 访问网站时，如果只填写了 IP 或域名（如 http://www.baidu.com），则此时 request.url=/
        - 我们在浏览器提交网址时，浏览器会额外自动向服务器发送一个 favicon 的请求
*/

// 1. 导入 http 模块
const http = require('http');

// 2. 创建 http 服务
const server = http.createServer((request, response) => {
    // 请求行信息
    let mtd = request.method;
    let url = request.url;
    let ver = request.httpVersion;
    // 请求头信息
    let headers = request.headers;
    if (url !== '/favicon.ico') {
        console.log("==================================================================");
        console.log(`> 请求行信息：请求方法=${mtd}，请求路径=${url}，请求 http 版本=${ver}`);
        console.log(`> 请求头信息`);
        console.log(headers);
        console.log("==================================================================");
    }
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('<h1>获取请求行与请求头</h1>');
});

// 3. 启动 http 服务
server.listen(9000, () => {
    console.log('9000 端口的 http 服务启动了');
});