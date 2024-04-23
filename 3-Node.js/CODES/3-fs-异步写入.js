/* 
    异步写入
        1. 什么是异步写入？当使用异步模式将内容写入文件，JS 主线程会将写入操作后交给 IO 线程去完成，当 IO 线程完成了写入操作后，
        会将写入方法传进的回调函数压进消息队列中等待 JS 主线程执行。因此我们可能会发现：我们在写入方法中传进的回调的执行比写入方法
        后内容的执行时机更晚。
        2. 语法：fs.writeFile(file, data[, option], callback)
            - 参数
                - file 文件路径
                - data 写入数据
                - options 选项设置（可选）
                - callback 回调函数
                    - 当写入操作执行完毕后，回调函数会被压进消息队列中等待执行
                    - 默认回调函数接收一个参数 err，当写入失败时，err 是错误对象；当写入成功时，err 是 null
            - 返回值 undefined
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 异步写入
fs.writeFile("./FSData/write-asynchronous.txt", "三人行，则必有我师焉", err => {
    if(err){ // 写入失败，处理错误对象
        console.log(err);
        console.log('文件写入失败');
    }else{  // 写入成功
        console.log('文件写入成功');
    }
});

console.log('hello world');

/* 
    根据控制台的输出如下，我们可以看到异步的工作模式：主线程将写入操作交给 IO 线程后，继续向下执行，当 IO 线程结束后，将写入方法传
    进的回调函数压入消息队列中等待主线程执行！
        hello world
        文件写入成功
*/