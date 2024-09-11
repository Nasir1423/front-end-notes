/* 
    追加写入
        1. 什么是追加写入？即在文件尾部追加内容。
        2. 追加写入的两种语法
            - 异步追加写入 fs.appendFile(file, data[, options], callback)
            - 同步追加写入 fs.appendFile(file, data[, options])
            - 参数：含义同异步写入和同步写入
            - 返回值：都是 undefined
        3. 注
            - 我们也可以通过设置 options={flag: 'a'} 参数，使用 fs.writeFile/fs.writeFileSync 实现追加写入
            - 字符串中可以通过 \r\n 实现内容换行
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 追加写入
for (let i = 0; i < 3; i++) {
    // 2.1 异步追加写入
    fs.appendFile('./FSData/append-file.txt', "三人行，则必有我师焉\r\n", err => {
        if (err) {
            console.log(err);
            console.log('异步追加失败');
        } else {
            console.log('异步追加成功');
        }
    })
    // 2.2 同步追加写入
    try {
        fs.appendFileSync('./FSData/append-file.txt', "择其善者而从之，其不善者而改之\r\n");
        console.log('同步追加成功');
    } catch (err) {
        console.log(err);
        console.log('同步追加失败');
    }
}

/* 
    我们也可以通过控制台输出信息，观察到同步和异步两种工作模式的区别
        同步追加成功
        同步追加成功
        同步追加成功
        异步追加成功
        异步追加成功
        异步追加成功

*/