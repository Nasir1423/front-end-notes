/* 

    独立的 js 文件，使用 module.exports 向外暴露一组路由规则

        - get / "网站首页"
        - get /adminLogin "管理员登陆"
        - get /login "用户登录"
        - get /search "搜索"
*/

// 导入 express
const express = require('express');

// 创建路由器对象 Router
const router = express.Router();

// 在路由器对象上添加路由规则
router.get('/', (_, response) => response.send('<h1>这是网站首页</h1>'));
router.get('/adminLogin', (_, response) => response.send('<h1>管理员登录</h1>'));
router.get('/login', (_, response) => response.send('<h1>用户登录</h1>'));
router.get('/search', (_, response) => response.send('<h1>搜索</h1>'));
router.all('*', (_, response) => response.status(404).send('<h1>404 Not Found</h1>'));

// 暴露路由器对象
module.exports = router;