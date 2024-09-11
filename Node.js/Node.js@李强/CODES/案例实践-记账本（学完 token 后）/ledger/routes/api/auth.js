/* 对 RESTful API 进行会话控制，需要登录后才能访问 api 数据 */
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var { SECRET } = require('../../config/config.json');

var UserModel = require('../../models/UserModel');

var md5 = require('md5'); // 使用单向加密算法对用户密码等敏感信息进行加密

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(req.body);
    UserModel.findOne({ username: username, password: md5(password) })
        .then((data) => {
            if (data) { // 查找到数据
                let token = jwt.sign(
                    { username: data.username, id: data._id },
                    SECRET,
                    { expiresIn: 60 * 60 * 24 }
                );
                res.json({
                    code: '0000',
                    msg: '登录成功',
                    data: token
                });
            } else { // 查找不到数据
                res.json({
                    code: '2001',
                    msg: '用户名或密码错误',
                    data: null
                });
            }
        })
        .catch(() => {
            res.json({
                code: '2002',
                msg: '数据库读取失败',
                data: null
            });
        })
});

// 退出登录
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.render('success', { msg: "成功退出登录", url: "/login" });
    })
});

module.exports = router;
