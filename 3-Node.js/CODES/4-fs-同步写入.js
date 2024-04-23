/* 
    同步写入
        1. 什么是同步写入？当时用同步模式将内容写入文件，JS 主线程会等待写入操作完毕后再继续向后执行。
        2. 语法：fs.writeFileSync(file, data[, options])
            - 参数
                - file 文件路径
                - data 写入数据
                - options 选项设置（可选）
            - 返回值 undefined
        3. 同步 Vs. 异步
            - Node.js 中的磁盘操作是由其他线程完成的，根据主线程是否等待可以分为两种模式：同步处理模式和异步处理模式
            - 同步处理模式：JS 主线程会等待其他线程的执行结果，然后在继续执行主线程的代码，效率较低
            - 异步处理模式：JS 主线程不会等待其他线程的执行结果，直接执行后续主线程的代码，效率较好
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 同步写入
try { // 写入成功
    fs.writeFileSync("./FSData/write-synchronous.txt", "择其善者而从之，其不善者而改之");
    console.log('文件写入成功');
} catch (err) { // 写入失败，处理错误对象
    console.log(err);
    console.log('文件写入失败');
}

console.log('hello world');

/* 
    根据控制台的输出如下，我们可以看到同步的工作模式：主线程等待写入操作执行完毕后在继续向后执行主线程的其代码
        文件写入成功
        hello world
*/