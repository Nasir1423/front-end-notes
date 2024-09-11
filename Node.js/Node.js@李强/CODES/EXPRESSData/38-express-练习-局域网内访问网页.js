/* 
    练习：实现局域网内访问尚品汇网页

    1. 设置静态资源目录，并将尚品汇网页命名为 index.html
    2. 将手机和电脑连接同一个 Wifi，此时手机和电脑便处于同一个局域网中
    3. 获取电脑在局域网中的 ip
        - 命令行中输入 ipconfig
        - 显示的内容中 Wireless LAN adapter WLAN 的 IPv4 Address 字段的值就是电脑的 ip，如 192.168.1.117
        - 在手机上输入电脑的 ip 和服务的端口号，就可以访问尚品汇网页啦，如 192.169.1.117:9000
*/

const express = require('express');
const app = express();

// 使用静态资源中间件设置静态资源目录
app.use(express.static(__dirname + '\\尚品汇'));

app.listen(9000, () => {
    console.log('监视 9000 端口的服务已启动...');
});