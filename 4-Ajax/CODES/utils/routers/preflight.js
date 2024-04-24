/* 
    预检请求路由
    - 在跨域资源共享（CORS）中，预检请求（preflight request）是浏览器在发送实际请求之前，发送一个 OPTIONS 请求给服务器的过程。这
    个 OPTIONS 请求用于获取服务器对实际请求的跨域访问是否被允许的信息。
    - OPTIONS 是 HTTP 协议中的一种请求方法，通常用于 CORS（跨域资源共享）中进行预检请求。
    - 当使用非简单请求（例如带有自定义头部或使用非 GET、POST、HEAD 方法的请求）进行跨域请求时，浏览器会先发送一个 OPTIONS 请求给目
    标服务器，以确定是否允许实际请求的跨域访问。服务器会在响应中包含 CORS 相关的头部信息，如 Access-Control-Allow-Methods（允许
    的请求方法）、Access-Control-Allow-Headers（允许的请求头）、Access-Control-Allow-Origin（允许的来源域）等，以便浏览器判断
    是否可以继续发送实际请求。因此，OPTIONS 请求在跨域请求中起到了确定是否允许跨域访问的作用，并且可以设置允许的自定义请求头。
*/
const express = require('express');
const corsMiddleware = require('../middlewares/cors');

const router = express.Router();

router.options('*', corsMiddleware, (_, res) => {
    res.end();
});

module.exports = router;