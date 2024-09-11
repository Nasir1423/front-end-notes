/* 
    文件夹的读取（同步和异步两种实现）
        - 异步实现 fs.readdir(path[, options], (err, data) => {})
        - 同步实现 fs.readdirSync(path[, options]): Array
        - 参数
            - path 文件夹路径
            - options 选项配置（可选）
            - callback 回调函数，文件夹读取操作完成后自动调用，函数接收 err 参数和 data 参数
                - err 当文件夹读取成功，err 是 null，否则是错误对象
                - data 文件夹中的内容信息数组
        - 注：同步实现的返回值是文件夹中的内容信息的数组对象
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 异步读取
fs.readdir('./', (err, data) => {
    if (err) {
        console.log('文件夹异步读取失败');
        return;
    }
    console.log('文件夹异步读取成功');
    console.log('文件夹信息为');
    console.log(Array.isArray(data)); // true
    console.log(data);
});

// 3. 同步读取
try {
    let data = fs.readdirSync('../');
    console.log('文件夹同步读取成功');
    console.log('文件夹信息为');
    console.log(Array.isArray(data)); // true
    console.log(data);
} catch (err) {
    console.log('文件夹同步读取失败');
    return;
}