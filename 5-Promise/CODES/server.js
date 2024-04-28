const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 设置允许跨域
    next();
});

// 3-Promise 封装 ajax 请求发送
app.get('/getPoem', (req, res) => {
    fs.readFile(__dirname + '\\resources\\宣州謝脁樓餞別校書叔雲.txt', (err, data) => {
        if (err) res.status(500).send('文件读取错误');
        res.send(data.toString());
    });
});

app.listen(9000, () => {
    console.log('9000 端口的服务已启动...');
});