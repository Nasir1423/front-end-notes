/* 
    搭建 HTTP 服务，响应一个 4 行 3 列的表格，并且要求表格有 隔行换色效果 ，且 点击 单元格能 高亮显示
*/

const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((request, response) => {
    fs.readFile(path.resolve(__dirname, './HTTPData/table43.html'), (err, data) => {
        if (err) {
            response.statusCode = 404;
            response.setHeader('content-type', 'text/plain;charset=utf-8');
            response.end('File Not Found');
        } else {
            response.statusCode = 200;
            response.setHeader('content-type', 'text/html;charset=utf-8');
            response.end(data); // 注意：end 接受 String 参数，也接受 Buffer 参数
        }
    })
});

server.listen(9000, () => {
    console.log('服务已启动...');
})