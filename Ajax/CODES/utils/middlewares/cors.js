// cors 中间件：该中间件允许跨域请求，并且允许客户端发送任意自定义的请求头
module.exports = function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 设置允许跨域
    res.setHeader('Access-Control-Allow-Headers', '*'); // 设置允许自定义的响应头
    next();
};