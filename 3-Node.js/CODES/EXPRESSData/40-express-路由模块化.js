/* 
    路由模块化，即在外部文件中编写路由规则，主文件中通过 require 导入并通过 app.use(router) 的方式使用这些导入的路由规则
*/

const express = require('express');
const router = require('./40-express-testRouter'); // 导入路由规则

const app = express();

app.use(router); // 使用路由规则

app.listen(9000, () => console.log('9000 端口的服务监听已启动...'));