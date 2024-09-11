/* 
    异步读取：将读取操作交给 IO 线程，而 JS 主线程继续执行
    
    fs.readFile(file[, options], callback)
        - 参数
            - file 文件路径
            - options 选项配置（可选）
            - callback 回调函数
                - 当读取操作完成后，回调函数被传入消息队列等待主线程调用
                - 回调函数接收两个参数 err 和 data
                    - err 读取成功时，err 是 null，读取失败时，err 是错误对象
                    - data Buffer 对象存储的数据
        - 返回值 undefined
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 异步读取
fs.readFile('./FSData/write-asynchronous.txt', (err, data) => {
    if (err) { // 异步读取失败
        console.log(err);
        console.log('文件读取失败！');
        throw err; // 也可以通过这种方式处理错误对象
    } else { // 异步读取成功
        console.log('文件读取成功！');
        console.log('文件内容读取结果为为如下');
        console.log(data.toString());
    }
})

console.log('hello world'); // 由于异步的原因，控制台先打印了 hello world