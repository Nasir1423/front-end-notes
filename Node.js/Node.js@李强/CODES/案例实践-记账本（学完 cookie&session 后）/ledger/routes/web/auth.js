/* 用户注册、登录的路由 */
var express = require('express');
var router = express.Router();

var UserModel = require('../../models/UserModel');

var md5 = require('md5'); // 使用单向加密算法对用户密码等敏感信息进行加密

/* 注册相关 */
// 渲染用户注册表单
router.get('/reg', (_, res) => {
    res.render('auth/reg');
});

// 将用户注册信息添加进数据库
router.post('/reg', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) })
        .then(() => {
            // 这里还可以进一步对数据进行合法性判断
            res.render('success', { msg: '注册成功', url: '/login' }); // 注册成功则跳转登录页面
        })
        .catch(() => {
            res.status(500).send('<h1>注册出错，请稍候再试</h1>'); // 注册失败则设置对应的状态信息
        });
});

/* 登录相关 */
// 渲染用户登录表单
router.get('/login', (_, res) => {
    res.render('auth/login');
});

// 将用户登录数据与数据库中的数据进行匹配
// 【写入 session 数据，返回 session id】成功则以 cookie 的方式返回 session id，提示登录成功跳转账单；失败则提示登录失败跳转登录
// 注：有了 session 后我们就可以对网页进行访问控制，访问账单时进行检测，对于没有 session_id 的用户不显示账单数据，而重定向至登录页面
router.post('/login', (req, res) => {
    let { username, password } = req.body;
    UserModel.findOne({ username: username, password: md5(password) })
        .then((data) => {
            // 还要进一步判断是否查找到数据
            if (data) {
                // 写入 session 并以 cookie 的形式返回 session id
                req.session.username = data.username;
                req.session._id = data._id;
                res.render('success', { msg: "登录成功", url: "/ledger-list" });
            } else {
                res.render('fail', { msg: "未注册，请注册", url: "/reg" });
            }
        })
        .catch(() => {
            res.status(500).send('<h1>登录出错，请稍候再试</h1>'); // 登录失败则设置对应的状态信息
        })
});

// 退出登录
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', { msg: "成功退出登录", url: "/login" });
    })
});

module.exports = router;
