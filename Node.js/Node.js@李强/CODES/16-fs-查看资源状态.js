/* 
    查看资源状态（异步和同步实现）
        - 异步实现 fs.stat(path[, options], (err, data) => {})
        - 同步实现 fs.stat(path[, options]): data
        - 参数
            - path 文件夹路径
            - options 选项配置（可选）
            - callback 回调函数，查看资源时自动调用，函数接收 err 参数和 data 参数
                - err 当文件夹创建成功，err 是 null，否则是错误对象
                - data 资源的状态信息，是一个对象结构，有以下属性和方法
                    - size 表示资源大小
                    - birthtime 表示资源创建时间
                    - mtime 表示资源最后修改时间
                    - ...
                    - isFile() 检测资源是否为文件
                    - isDirectory() 检测资源是否为文件夹
                    - ...

*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 异步查看资源状态信息
fs.stat('../Node.js.md', (err, data) => {
    if (err) {
        console.log("资源信息异步查看失败");
        return;
    }
    console.log("资源信息异步查看成功");
    console.log("资源大小为 " + data.size / 1024 + "KB");
    console.log("资源的创建时间为 " + data.birthtime);
    console.log("资源最后修改时间为 " + data.mtime);
    console.log("资源是否为文件？" + data.isFile());
    console.log("资源是否为文件夹？" + data.isDirectory());
});