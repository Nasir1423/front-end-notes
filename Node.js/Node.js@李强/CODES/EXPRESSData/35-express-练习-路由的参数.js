/* 

    练习：根据路由参数响应歌手信息（./singer.json）

    - 当浏览器的请求 URL 的路径为：/singer/id.html 时（id 是一个数字）
    - 服务端根据请求 URL 的路径中 id 的值，返回 ./singer.json 中对应 id 的歌手姓名及图片

*/

const express = require('express');
const { singers } = require('./singer.json');
const app = express();

app.get('/singers/:id.html', (req, res) => {
    let { id } = req.params;
    let singer = singers.find(ele => ele.id === Number(id));

    if (singer) { // 存在歌手
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            
            <body>
                <span>${singer.singer_name}</span>
                <br>
                <img src="${singer.singer_pic}" >
            
            </body>
            
            </html>
        `);

    } else { // 不存在歌手
        res.statusCode = 404;
        res.end('Singer Not Found');
    }
});

app.all('*', (req, res) => {
    res.statusCode = 404;
    res.end('Url Not Fond');
});

app.listen(9000, () => {
    console.log('9000 端口的服务已启动...');
})