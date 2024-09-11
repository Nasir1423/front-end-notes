/* 

    1. 由于 express 相当于一个 npm 包，为了使用 express 提供的工具，需要先创建一个项目文件夹，并使用 `npm init` 将该项目文件夹初
    始化为一个包，然后在使用 `npm i express` 下载 express 依赖

    2. 执行代码时，可以使用 nodemon 全局命令启动服务，语法为 `nodemon 文件名`

*/

// 1. 导入 express 模块
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则：如果请求方式是 GET，同时请求 URL 的路径是 /home，则执行回调函数设置响应报文
app.get('/home', (req, res) => {
    res.end('<h1>welcome to express</h1>')
});

// 4. 监听端口，启动服务
app.listen(9000, ()=>{
    console.log('服务已启动，监听端口 9000 ...');
});