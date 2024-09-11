/* 
    按照以下要求搭建 HTTP 服务

    请求类型(方法)  请求地址    响应体结果
        get         /login      登录页面
        get         /reg        注册页面
*/
const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    // 对象的解构赋值：请求类型
    let {method} = request;
    // 对象的解构赋值请求地址
    let {pathname} = url.parse(request.url);
    response.setHeader('content-type', 'text/html;charset=utf-8');
    if (method.toLowerCase() === 'get') {
        if (pathname === '/login') {
            response.end('<h1>登录页面</h1>');
        } else if (pathname === '/reg') {
            response.end('<h1>注册页面</h1>')
        }else{
            // 如果不设置这个 else 分支，则路径为 /login 或 /reg 之外时，服务无法返回响应报文，只有请求，没有响应而出现问题
            response.end('<h1>Page Not Found</h1>')
        }
    };
});

server.listen(9000, () => {
    console.log('9000 端口的服务启动~~~');
})