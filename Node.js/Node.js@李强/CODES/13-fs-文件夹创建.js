/* 
    文件夹的创建（同步和异步两种实现）
        - 异步实现：fs.mkdir(path[, options], (err) => {})
        - 同步实现：fs.mkdirSync(path[, options])
        - 参数
            - path 文件夹路径
            - options 选项配置（可选）
            - callback 回调函数，文件夹创建操作完成后自动调用，函数接收一个 err 参数，当文件夹创建成功，err 是 null，否则是错误对象
        - 递归创建：如果要创建一个 a 文件夹，再在 a 文件夹中创建一个 b 文件夹，再在 b 文件夹中创建一个 c 文件夹，我们此时便可以选
        择递归创建，只需要传入 a/b/c 就可以实现三层文件夹的创建，同时需要配置可选参数 options={recursive: true};
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 异步创建文件夹
fs.mkdir('./FSData/test1', err => {
    if (err) {
        console.log('文件夹异步创建失败');
        return;
    }
    console.log("文件夹异步创建成功");
});

// 3. 同步创建文件夹
try {
    fs.mkdirSync('./FSData/test2');
    console.log('文件夹同步创建成功');
} catch (err) {
    console.log('文件夹同步创建失败');
}

// 4. 异步递归创建文件夹 a/b/c
fs.mkdir('./FSData/a/b/c', { recursive: true }, err => {
    if (err) {
        console.log('文件夹递归异步创建失败');
        return;
    }
    console.log("文件夹异步递归创建成功");
});