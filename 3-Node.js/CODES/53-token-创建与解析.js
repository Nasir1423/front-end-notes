/* 
    我们可以使用 jsonwebtoken 包来实现 token 的创建与解析
    - 导入 const jwt = require('jsonwebtoken')
    - 创建 let token = jwt.sign(数据对象, 加密字符串, 配置对象)
        - 数据对象：指的是用户数据构成的对象，如用户名、邮件、密码等信息
        - 加密字符串：与 session 的签名字符串类似，用于加密
        - 配置对象：配置 token 的一些特性，如 expireIn 字段用于配置 token 的生命周期，单位是秒
    - 解析 jwt.verify(token, 加密字符串, (err, data) => {})
*/
const jwt = require('jsonwebtoken');

let token = jwt.sign({
    username: 'chuanyitu',
    email: '12345@qq.com'
}, 'yitu', {
    expiresIn: 60
});

jwt.verify(token, 'yitu', (err, data) => {
    if (err) {
        console.log('解析出错: ' + err.message);
    } else {
        console.log('解析成功: ', data);
    }
})