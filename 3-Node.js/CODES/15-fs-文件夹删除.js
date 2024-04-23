/* 
    文件夹的删除（同步和异步两种实现）
        - 异步实现
            - fs.rmdir(path[, options], err => {})
        - 同步实现
            - fs.rmdirSync(path[, options])
        - 参数
            - path 文件夹路径
            - options 选项配置（可选）
            - callback 回调函数，文件夹读取操作完成后自动调用，函数接收 err 参数，当文件夹读取成功，err 是 null，否则是错误对象
        - 递归删除：如果我们要删除 a 文件夹，而 a 文件夹中又有 b 文件夹，b 文件夹中又有 c 文件夹，我们此时便可以选择递归删除，只需
        要传入 a 就可以实现 a 和其下内容的删除，同时需要配置可选参数 options={recursive: true}
            - 递归异步删除文件夹 fs.rm(path, options={recursive: true}, err => {})
            - 递归同步删除文件夹 fs.rmSync(path, options={recursive: true})
            - 注意：当递归删除文件夹时，我们不使用 rmdir/rmdirSync（deprecated），而采用和删除文件一样的方法 rm/rmSync
*/

// 1. 导入 fs 模块
const fs = require('fs');

// 2. 异步删除文件夹
fs.rmdir('./FSData/test1', err => {
    if (err) {
        console.log('文件夹异步删除失败');
        console.log(err.message);
        return;
    }
    console.log('文件夹异步删除成功');
});

// 3. 同步删除文件夹
try {
    fs.rmdirSync('./FSData/test2');
    console.log('文件夹同步删除成功');

} catch (err) {
    console.log('文件夹同步删除失败');
    console.log(err.message);
}

// 4. 递归删除文件夹
fs.rm('./FSData/a', { recursive: true }, err => {
    if (err) {
        console.log('文件夹异步删除失败');
        console.log(err.message);
        return;
    }
    console.log('文件夹异步删除成功');
});