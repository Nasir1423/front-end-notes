/* 
    我们可以通过 response 对象设置响应报文：响应行、响应头、响应体

    1. 响应行
        - 响应状态码 response.statusCode = xxx
        - 响应状态描述 response.statusMessage = xxx，很少使用
    2. 响应头
        - response.retHeader(头名, 头值)
        - 常用响应头举例
            - response.setHeader('content-type', 'text/html;charset=utf-8'); 设置响应体为 html 文本，以 utf-8 字符集解析（用
            于解决中文乱码）
            - response.setHeader('server', 'Node.js'); 设置服务器的名称为 Node.js（名称可以任意设置）
        - 响应头可以自定义，比如 response.setHeader('myHeader', 'helloWorld')
        - 可以设置多个同名的响应头，比如 response.setHeader('testName', ['ValueA', 'ValueB', 'ValueC']);
    3. 响应体
        - response.write(msg) 向响应体中添加内容，可以多次调用
        - response.end([msg]) 向响应体中添加内容，并表明响应报文生成完毕，只能调用一次
        - 注意：无论是否使用 response.write 方法，都要调用 response.end 方法表示响应报文结束生成
        - 向响应体中添加内容的两种使用情况
            - 情形一：write 和 end 结合使用，此时 end 可以不传递参数，仅仅表示响应报文结束生成
                response.write('xxx')
                response.write('xxx')
                response.write('xxx')
                response.end()
            - 情形二：单独使用 end
                response.end('xxx')
*/

// 1. 导入 http 模块
const http = require('http');

// 2. 创建服务对象
const server = http.createServer((request, response) => {
    // (1) 设置响应状态码
    response.statusCode = 200;
    // (2) 设置响应状态描述
    response.statusMessage = 'Very OK';
    // (3) 设置响应头
    response.setHeader('content-type', 'text/html;charset=utf-8');
    // (4) 设置响应体
    response.write('<h1>Some Random Numbers below:</h1>');
    response.write(`<p>random number 1 ${Math.random()}</p>`);
    response.write(`<p>random number 2 ${Math.random()}</p>`);
    response.write(`<p>random number 3 ${Math.random()}</p>`);
    response.write(`<p>random number 4 ${Math.random()}</p>`);
    response.end();
})

// 3. 启动服务器
server.listen(9000, () => {
    console.log('服务已经启动....')
})