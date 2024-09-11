/* 
    同步读取：JS 主线程会等待读取操作完成后，再继续执行其他代码

    fs.readFileSync(file[, options])
        - 参数
            - file 文件路径
            - options 选项配置（可选）
        - 返回值
            - Buffer 对象
*/
// 1. 导入 fs 模块
const fs = require('fs');

// 2. 同步读取
try { // 同步读取成功
    let data = fs.readFileSync('./FSData/write-synchronous.txt');
    console.log('文件读取成功！');
    console.log('文件内容读取结果为为如下');
    console.log(data.toString());
} catch (err) { // 同步读取失败
    console.log(err);
    console.log('文件读取失败！');
    throw err; // 也可以通过这种方式处理错误对象
}

console.log('hello world'); // 由于同步的原因，控制台最后打印 hello world