/* 检测是否存在 token 的的中间件（通过 session 检测） */
var jwt = require('jsonwebtoken');

var { SECRET } = require('../config/config.json');

module.exports = function (req, res, next) {
    let token = req.get('token');
    if (token) {
        jwt.verify(token, SECRET, (err, data) => {
            if (err) {
                res.json({
                    code: '2004',
                    msg: err.message,
                    data: null
                });
            } else { // 校验成功
                req.user = data; // 这个意义是，通过 api 获取数据时，可以根据 user 信息获取对应的数据，即获取特定用户的特定数据
                next();
            }
        })

    } else {
        res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        });
    }
}